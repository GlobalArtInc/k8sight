import { getOrInsertWith, interval, waitUntilDefined } from "@kubesightapp/utilities";
import { observable } from "mobx";

import type { Pod, PodLogsQuery } from "@kubesightapp/kube-object";
import type { IntervalFn } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";

import type { GetPodsByOwner } from "../../workloads-pods/get-pods-by-owner.injectable";
import type { PodStore } from "../../workloads-pods/store";
import type { TabId } from "../dock/store";
import type { CallForLogs } from "./call-for-logs.injectable";
import type { LogTabData } from "./tab-store";

type PodLogLine = string;

const logLinesToLoad = 500;

interface Dependencies {
  callForLogs: CallForLogs;
  getPodsByOwner: GetPodsByOwner;
  podStore: PodStore;
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
      const combinedLogs = [...oldLogs, ...newLogs];

      const sortedLogs = combinedLogs.sort((a, b) => {
        const timestampA = this.extractTimestamp(a);
        const timestampB = this.extractTimestamp(b);

        if (timestampA && timestampB) {
          return timestampA.getTime() - timestampB.getTime();
        }

        if (timestampA) {
          return -1;
        }

        if (timestampB) {
          return 1;
        }

        return 0;
      });

      this.podLogs.set(tabId, sortedLogs);
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
    const tabData = await waitUntilDefined(() => logTabData.get());

    if (!tabData) {
      return [];
    }

    const { selectedContainer, showPrevious, owner, selectedPodId, namespace } = tabData;

    if (owner?.uid || selectedPodId === "all-pods") {
      let pods: Pod[];

      if (owner?.uid) {
        pods = this.dependencies.getPodsByOwner(owner, namespace);
      } else if (selectedPodId === "all-pods") {
        pods = this.dependencies.podStore.items.filter((pod) => pod.getNs() === namespace);
      } else {
        pods = [];
      }

      if (pods.length === 0) {
        return [];
      }

      const allLogs: string[] = [];

      await Promise.all(
        pods.map(async (pod) => {
          try {
            const podNamespace = pod.getNs();
            const podName = pod.getName();
            const podLogs = await this.dependencies.callForLogs(
              { namespace: podNamespace, name: podName },
              {
                ...params,
                timestamps: true,
                container: selectedContainer,
                previous: showPrevious,
              },
            );

            const lines = podLogs.trimEnd().replace(/\r/g, "\n").split("\n").filter(Boolean);

            for (const line of lines) {
              allLogs.push(`[${podName}] ${line}`);
            }
          } catch (error) {
            const errorMessage = `[${pod.getName()}] Failed to load logs: ${error instanceof Error ? error.message : String(error)}`;
            allLogs.push(errorMessage);
          }
        }),
      );

      return allLogs.sort((a, b) => {
        const timestampA = this.extractTimestamp(a);
        const timestampB = this.extractTimestamp(b);

        if (timestampA && timestampB) {
          return timestampA.getTime() - timestampB.getTime();
        }

        return 0;
      });
    }

    const pod = computedPod.get();

    if (!pod) {
      return [];
    }

    const podNamespace = pod.getNs();
    const podName = pod.getName();

    const result = await this.dependencies.callForLogs(
      { namespace: podNamespace, name: podName },
      {
        ...params,
        timestamps: true,
        container: selectedContainer,
        previous: showPrevious,
      },
    );

    return result.trimEnd().replace(/\r/g, "\n").split("\n");
  }

  private extractTimestamp(logLine: string): Date | null {
    const podMatch = logLine.match(/^\[.*?\]\s*(.+)/);

    if (podMatch) {
      const rest = podMatch[1];
      const timestampMatch = rest.match(/^(\d{4}-\d{2}-\d{2}T[\d:.Z+-]+|\d+\S+)/);

      if (timestampMatch) {
        try {
          const timestampStr = timestampMatch[1];

          if (timestampStr.includes("T")) {
            return new Date(timestampStr);
          }

          const numericMatch = timestampStr.match(/^(\d+)/);

          if (numericMatch) {
            const timestamp = parseInt(numericMatch[1], 10);

            if (!isNaN(timestamp) && timestamp > 0) {
              if (timestamp > 1e12) {
                return new Date(timestamp / 1e6);
              }

              return new Date(timestamp);
            }
          }
        } catch {
          return null;
        }
      }
    }

    const match = logLine.match(/^(\d{4}-\d{2}-\d{2}T[\d:.Z+-]+|\d+\S+)/);

    if (!match) {
      return null;
    }

    try {
      const timestampStr = match[1];

      if (timestampStr.includes("T")) {
        return new Date(timestampStr);
      }

      const numericMatch = timestampStr.match(/^(\d+)/);

      if (numericMatch) {
        const timestamp = parseInt(numericMatch[1], 10);

        if (!isNaN(timestamp) && timestamp > 0) {
          if (timestamp > 1e12) {
            return new Date(timestamp / 1e6);
          }

          return new Date(timestamp);
        }
      }

      return null;
    } catch {
      return null;
    }
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

    if (logs.length === 0) {
      return new Date().toISOString();
    }

    let latestTimestamp: Date | null = null;

    for (let i = logs.length - 1; i >= 0; i--) {
      const timestamp = this.extractTimestamp(logs[i]);

      if (timestamp) {
        latestTimestamp = timestamp;
        break;
      }
    }

    const stamp = latestTimestamp ?? new Date();

    stamp.setSeconds(stamp.getSeconds() + 1);

    return stamp.toISOString();
  }

  splitOutTimestamp(logs: string): [string, string] {
    const podMatch = logs.match(/^(\[.*?\])\s*(.*)/);

    if (podMatch) {
      const podPrefix = podMatch[1];
      const rest = podMatch[2];
      const extraction = /^(\d+\S+)(.*)/m.exec(rest);

      if (extraction && extraction.length >= 3) {
        return [`${podPrefix} ${extraction[1]}`, extraction[2]];
      }

      return [podPrefix, rest];
    }

    const extraction = /^(\d+\S+)(.*)/m.exec(logs);

    if (!extraction || extraction.length < 3) {
      return ["", logs];
    }

    return [extraction[1], extraction[2]];
  }

  getTimestamps(logs: string) {
    const podMatch = logs.match(/^\[.*?\]\s*(.*)/);

    if (podMatch) {
      const rest = podMatch[1];
      const timestampMatch = rest.match(/^(\d+\S+)/);

      if (timestampMatch) {
        return [timestampMatch[1]];
      }
    }

    return logs.match(/^\d+\S+/gm);
  }

  removeTimestamps(logs: string): string {
    const podMatch = logs.match(/^(\[.*?\])\s*(.*)/);

    if (podMatch) {
      const podPrefix = podMatch[1];
      const rest = podMatch[2];
      const withoutTimestamp = rest.replace(/^\d+.*?\s/gm, "");

      return `${podPrefix} ${withoutTimestamp}`;
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
