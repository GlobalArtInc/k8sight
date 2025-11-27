import { getOrInsertWith, interval, waitUntilDefined } from "@kubesightapp/utilities";
import { observable } from "mobx";

import type { Pod, PodLogsQuery } from "@kubesightapp/kube-object";
import type { IntervalFn } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";

import type { DeploymentStore } from "../../workloads-deployments/store";
import type { TabId } from "../dock/store";
import type { CallForLogs } from "./call-for-logs.injectable";
import type { GetPodsByOwnerId } from "../../workloads-pods/get-pods-by-owner-id.injectable";
import type { PodStore } from "../../workloads-pods/store";
import type { LogTabData } from "./tab-store";

type PodLogLine = string;

const logLinesToLoad = 500;

interface Dependencies {
  callForLogs: CallForLogs;
  getPodsByOwnerId: GetPodsByOwnerId;
  podStore: PodStore;
  deploymentStore: DeploymentStore;
}

export class LogStore {
  protected podLogs = observable.map<TabId, PodLogLine[]>();
  protected refreshers = new Map<TabId, IntervalFn>();

  constructor(private dependencies: Dependencies) {}

  protected handlerError(tabId: TabId, error: any): void {
    if (error.error && !(error.message || error.reason || error.code)) {
      error = error.error;
    }

    const message = [`Failed to load logs: ${error.message}`, `Reason: ${error.reason} (${error.code})`];

    this.stopLoadingLogs(tabId);
    this.podLogs.set(tabId, message);
  }

  /**
   * Function prepares tailLines param for passing to API request
   * Each time it increasing it's number, caused to fetch more logs.
   * Also, it handles loading errors, rewriting whole logs with error
   * messages
   */
  public async load(
    tabId: TabId,
    computedPod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
  ): Promise<void> {
    try {
      const logs = await this.loadLogs(computedPod, logTabData, {
        tailLines: this.getLogLines(tabId) + logLinesToLoad,
      });

      this.getRefresher(tabId, computedPod, logTabData).start();
      this.podLogs.set(tabId, logs);
    } catch (error) {
      this.handlerError(tabId, error);
    }
  }

  private getRefresher(
    tabId: TabId,
    computedPod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
  ): IntervalFn {
    return getOrInsertWith(this.refreshers, tabId, () =>
      interval(10, () => {
        if (this.podLogs.has(tabId)) {
          this.loadMore(tabId, computedPod, logTabData);
        }
      }),
    );
  }

  /**
   * Stop loading more logs for a given tab
   * @param tabId The ID of the logs tab to stop loading more logs for
   */
  public stopLoadingLogs(tabId: TabId): void {
    this.refreshers.get(tabId)?.stop();
  }

  /**
   * Function is used to refresher/stream-like requests.
   * It changes 'sinceTime' param each time allowing to fetch logs
   * starting from last line received.
   * @param tabId
   */
  public async loadMore(
    tabId: TabId,
    computedPod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
  ): Promise<void> {
    const oldLogs = this.podLogs.get(tabId);

    if (!oldLogs?.length) {
      return;
    }

    try {
      const logs = await this.loadLogs(computedPod, logTabData, {
        sinceTime: this.getLastSinceTime(tabId),
      });

      const newLogs = logs.filter(Boolean);
      if (newLogs.length === 0) {
        return;
      }

      const tabData = logTabData.get();
      if (tabData?.owner?.uid) {
        const mergedLogs = [...oldLogs, ...newLogs];
        mergedLogs.sort((a, b) => {
          const timestampA = a.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)/)?.[1];
          const timestampB = b.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)/)?.[1];

          if (!timestampA || !timestampB) {
            return 0;
          }

          const dateA = new Date(timestampA);
          const dateB = new Date(timestampB);

          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }

          return dateA.getTime() - dateB.getTime();
        });

        this.podLogs.set(tabId, mergedLogs);
      } else {
        this.podLogs.set(tabId, [...oldLogs, ...newLogs]);
      }
    } catch (error) {
      this.handlerError(tabId, error);
    }
  }

  /**
   * Main logs loading function adds necessary data to payload and makes
   * an API request
   * @param tabId
   * @param params request parameters described in IPodLogsQuery interface
   * @returns A fetch request promise
   */
  private async loadLogs(
    computedPod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
    params: Partial<PodLogsQuery>,
  ): Promise<string[]> {
    const {
      pod,
      tabData: { selectedContainer, showPrevious, owner },
    } = await waitUntilDefined(() => {
      const pod = computedPod.get();
      const tabData = logTabData.get();

      if (pod && tabData) {
        return { pod, tabData };
      }

      if (tabData?.owner) {
        return { pod: undefined, tabData };
      }

      return undefined;
    });

    if (owner?.uid) {
      let pods: Pod[];

      if (owner.kind === "Deployment") {
        const deployment = this.dependencies.deploymentStore.items.find((item) => item.getId() === owner.uid);

        if (deployment) {
          pods = this.dependencies.deploymentStore.getChildPods(deployment);
        } else {
          pods = [];
        }
      } else {
        pods = this.dependencies.getPodsByOwnerId(owner.uid);
      }

      if (pods.length === 0) {
        return [];
      }

      const logPromises = pods.map(async (pod) => {
        try {
          const namespace = pod.getNs();
          const name = pod.getName();
          const podContainers = pod.getAllContainers();
          const containerToUse = podContainers.find((c) => c.name === selectedContainer) ?? podContainers[0];

          if (!containerToUse) {
            const podName = pod.getName();
            return [`[${podName}] No containers available`];
          }

          const result = await this.dependencies.callForLogs(
            { namespace, name },
            {
              ...params,
              timestamps: true,
              container: containerToUse.name,
              previous: showPrevious,
            },
          );

          const lines = result.trimEnd().replace(/\r/g, "\n").split("\n").filter(Boolean);
          const podName = pod.getName();

          return lines.map((line) => {
            const timestampMatch = line.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)\s*(.*)/);
            if (timestampMatch) {
              return `${timestampMatch[1]} [${podName}] ${timestampMatch[2]}`;
            }
            return `[${podName}] ${line}`;
          });
        } catch (error) {
          const podName = pod.getName();
          const errorMessage = error instanceof Error ? error.message : String(error);
          
          if (errorMessage.includes("not found") || errorMessage.includes("no logs available")) {
            return [];
          }
          
          return [`[${podName}] Failed to load logs: ${errorMessage}`];
        }
      });

      const allLogs = await Promise.all(logPromises);
      const mergedLogs = allLogs.flat();

      mergedLogs.sort((a, b) => {
        const timestampA = a.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)/)?.[1];
        const timestampB = b.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)/)?.[1];

        if (!timestampA || !timestampB) {
          return 0;
        }

        const dateA = new Date(timestampA);
        const dateB = new Date(timestampB);

        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0;
        }

        return dateA.getTime() - dateB.getTime();
      });

      return mergedLogs;
    }

    if (!pod) {
      return [];
    }

    const namespace = pod.getNs();
    const name = pod.getName();

    const result = await this.dependencies.callForLogs(
      { namespace, name },
      {
        ...params,
        timestamps: true,
        container: selectedContainer,
        previous: showPrevious,
      },
    );

    return result.trimEnd().replace(/\r/g, "\n").split("\n");
  }

  /**
   * @deprecated This depends on dockStore, which should be removed
   * Converts logs into a string array
   * @returns Length of log lines
   */
  get lines(): number {
    return this.logs.length;
  }

  getLogLines(tabId: TabId): number {
    return this.getLogs(tabId).length;
  }

  areLogsPresent(tabId: TabId): boolean {
    return !this.podLogs.has(tabId);
  }

  getLogs(tabId: TabId): string[] {
    return this.podLogs.get(tabId) ?? [];
  }

  getLogsWithoutTimestamps(tabId: TabId): string[] {
    return this.getLogs(tabId).map(this.removeTimestamps);
  }

  getTimestampSplitLogs(tabId: TabId): [string, string][] {
    return this.getLogs(tabId).map(this.splitOutTimestamp);
  }

  /**
   * @deprecated This now only returns the empty array
   * Returns logs with timestamps for selected tab
   */
  get logs(): string[] {
    return [];
  }

  /**
   * @deprecated This now only returns the empty array
   * Removes timestamps from each log line and returns changed logs
   * @returns Logs without timestamps
   */
  get logsWithoutTimestamps(): string[] {
    return this.logs.map((item) => this.removeTimestamps(item));
  }

  /**
   * It gets timestamps from all logs then returns last one + 1 second
   * (this allows to avoid getting the last stamp in the selection)
   * @param tabId
   */
  getLastSinceTime(tabId: TabId): string {
    const logs = this.podLogs.get(tabId) ?? [];
    const [timestamp] = this.getTimestamps(logs[logs.length - 1]) ?? [];
    const stamp = timestamp ? new Date(timestamp) : new Date();

    stamp.setSeconds(stamp.getSeconds() + 1); // avoid duplicates from last second

    return stamp.toISOString();
  }

  splitOutTimestamp(logs: string): [string, string] {
    const extractionWithPod = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)\s+\[([^\]]+)\]\s+(.*)/m.exec(logs);
    if (extractionWithPod && extractionWithPod.length >= 4) {
      return [extractionWithPod[1], `[${extractionWithPod[2]}] ${extractionWithPod[3]}`];
    }

    const extraction = /^(\d+\S+)(.*)/m.exec(logs);

    if (!extraction || extraction.length < 3) {
      return ["", logs];
    }

    return [extraction[1], extraction[2]];
  }

  getTimestamps(logs: string) {
    const timestampWithPod = logs.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z|\d+\S+)\s+\[/m);
    if (timestampWithPod) {
      return [timestampWithPod[1]];
    }

    return logs.match(/^\d+\S+/gm);
  }

  removeTimestamps(logs: string): string {
    const withoutTimestampAndPod = logs.replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+\[[^\]]+\]\s+/gm, "");
    if (withoutTimestampAndPod !== logs) {
      return withoutTimestampAndPod;
    }

    return logs.replace(/^\d+.*?\s/gm, "");
  }

  clearLogs(tabId: TabId): void {
    this.podLogs.delete(tabId);
  }

  reload(
    tabId: TabId,
    computedPod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
  ): Promise<void> {
    this.clearLogs(tabId);

    return this.load(tabId, computedPod, logTabData);
  }
}
