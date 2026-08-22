import { onceDefined } from "@kubesightapp/utilities";
import assert from "assert";
import { action, makeObservable, observable, when } from "mobx";
import { getClusterFrameUrl } from "../../../common/utils";
import { clampLiveFrames, defaultMaxLiveFrames } from "../../../features/dashboard-tabs/common/live-frames";

import type { Logger } from "@kubesightapp/logger";
import type { Disposer } from "@kubesightapp/utilities";

import type { ClusterId } from "../../../common/cluster-types";
import type { GetClusterById } from "../../../features/cluster/storage/common/get-by-id.injectable";

export interface K8sightView {
  isLoaded: boolean;
  frame: HTMLIFrameElement;
  clusterId: ClusterId;
}

interface Dependencies {
  readonly logger: Logger;
  readonly maxLiveFrames?: number;
  getClusterById: GetClusterById;
  emitClusterVisibility: (clusterId: ClusterId | null) => void;
}

export class ClusterFrameHandler {
  /**
   * Keyed by tab id rather than cluster id: two tabs may show the same cluster on different pages,
   * and each needs its own frame to keep its own router, scroll position and dock.
   */
  private readonly views = observable.map<string, K8sightView>();

  /** Tab ids, least recently visible first. Drives eviction once {@link maxLiveFrames} is hit. */
  private readonly recency: string[] = [];

  /**
   * How many frames may stay alive at once. See {@link defaultMaxLiveFrames}.
   *
   * Pushed in rather than injected: the handler is built long before user preferences have been
   * read off disk, and the budget has to keep following the preference after that.
   */
  private maxLiveFrames: number;

  constructor(protected readonly dependencies: Dependencies) {
    this.maxLiveFrames = clampLiveFrames(dependencies.maxLiveFrames ?? defaultMaxLiveFrames);
    makeObservable(this);
  }

  /** Lowering the budget frees the surplus frames now, rather than at the next tab switch. */
  @action
  public setMaxLiveFrames(count: number) {
    this.maxLiveFrames = clampLiveFrames(count);
    this.evictStaleViews(this.recency[this.recency.length - 1]);
  }

  public hasView(tabId: string): boolean {
    return this.views.has(tabId);
  }

  public hasLoadedView(tabId: string): boolean {
    return Boolean(this.views.get(tabId)?.isLoaded);
  }

  public clusterIdOfView(tabId: string): ClusterId | undefined {
    return this.views.get(tabId)?.clusterId;
  }

  /**
   * Identifies which view a `postMessage` came from.
   *
   * Comparing window identities is what makes the bridge trustworthy: a frame cannot claim to be
   * another one, and nothing has to be handed to it in-band for it to say who it is.
   */
  public findViewIdByContentWindow(source: MessageEventSource | null): string | undefined {
    if (!source) {
      return undefined;
    }

    for (const [viewId, view] of this.views) {
      if (view.frame.contentWindow === source) {
        return viewId;
      }
    }

    return undefined;
  }

  public postToView(viewId: string, message: unknown): void {
    const view = this.views.get(viewId);

    if (!view) {
      return;
    }

    // Addressed to the cluster's own subdomain rather than "*": should the frame have been
    // navigated somewhere else, the browser drops the message instead of handing our instructions,
    // and the pages a cluster serves, to a stranger.
    view.frame.contentWindow?.postMessage(message, this.originOfView(view));
  }

  /** The origin the frame is served from, matching the `src` given to it in {@link initView}. */
  private originOfView({ clusterId }: K8sightView): string {
    return new URL(getClusterFrameUrl(clusterId), location.href).origin;
  }

  /** The live views showing the given cluster, most recently used last. */
  public viewIdsForCluster(clusterId: ClusterId): string[] {
    return this.recency.filter((viewId) => this.views.get(viewId)?.clusterId === clusterId);
  }

  /**
   * Observable counterpart to {@link viewIdsForCluster} -- reads the views map itself, so mobx
   * picks the dependency up and callers re-run when a cluster's last frame goes away.
   */
  public hasViewForCluster(clusterId: ClusterId): boolean {
    for (const view of this.views.values()) {
      if (view.clusterId === clusterId) {
        return true;
      }
    }

    return false;
  }

  private touch(tabId: string) {
    const index = this.recency.indexOf(tabId);

    if (index !== -1) {
      this.recency.splice(index, 1);
    }

    this.recency.push(tabId);
  }

  /**
   * Tears down every frame over budget, oldest first, never the one currently on screen.
   */
  @action
  private evictStaleViews(keepTabId: string | undefined) {
    for (const tabId of [...this.recency]) {
      if (this.views.size <= this.maxLiveFrames) {
        return;
      }

      if (tabId === keepTabId || !this.views.has(tabId)) {
        continue;
      }

      this.dependencies.logger.info(`[K8SIGHT-VIEW]: evicting least recently used view, tabId=${tabId}`);
      this.closeView(tabId);
    }
  }

  /**
   * @param view an id to key the frame by, plus the cluster it shows. Usually a tab, but the
   * navigator also raises hidden frames of its own to discover what a cluster serves.
   */
  @action
  public initView(view: { id: string; clusterId: ClusterId }) {
    const tab = view;
    const cluster = this.dependencies.getClusterById(tab.clusterId);

    if (!cluster) {
      this.dependencies.logger.warn(`[K8SIGHT-VIEW]: not initializing view; unknown clusterId="${tab.clusterId}"`);

      return;
    }

    const parentElem = document.getElementById("k8sight-views");

    assert(parentElem, "DOM with #k8sight-views must be present");

    this.touch(tab.id);

    if (this.views.has(tab.id)) {
      return;
    }

    this.evictStaleViews(tab.id);

    this.dependencies.logger.info(`[K8SIGHT-VIEW]: init dashboard, clusterId=${tab.clusterId}, tabId=${tab.id}`);
    const iframe = document.createElement("iframe");

    iframe.id = `cluster-frame-${tab.id}`;
    // Created hidden; setVisibleTab is what decides which frame is on screen.
    iframe.classList.add("hidden");
    iframe.setAttribute("src", getClusterFrameUrl(tab.clusterId));
    iframe.setAttribute("allow", "clipboard-read; clipboard-write");
    iframe.addEventListener(
      "load",
      action(() => {
        this.dependencies.logger.info(`[K8SIGHT-VIEW]: frame for tabId=${tab.id} has loaded`);
        const view = this.views.get(tab.id);

        assert(view, `view for ${tab.id} MUST still exist here`);
        view.isLoaded = true;
      }),
      { once: true },
    );
    this.views.set(tab.id, { frame: iframe, isLoaded: false, clusterId: tab.clusterId });
    parentElem.appendChild(iframe);

    this.dependencies.logger.info(`[K8SIGHT-VIEW]: waiting cluster to be ready, clusterId=${tab.clusterId}`);

    const dispose = when(
      () => cluster.ready.get(),
      () => this.dependencies.logger.info(`[K8SIGHT-VIEW]: cluster is ready, clusterId=${tab.clusterId}`),
    );

    when(
      // cluster.disconnect is set to `false` when the cluster starts to connect
      () => !cluster.disconnected.get(),
      () => {
        when(
          () => {
            const cluster = this.dependencies.getClusterById(tab.clusterId);

            return Boolean(!cluster || (cluster.disconnected.get() && this.views.get(tab.id)?.isLoaded));
          },
          () => {
            this.closeView(tab.id);
            dispose();
          },
        );
      },
    );
  }

  /**
   * Removes a frame from the DOM. The tab it belonged to may still exist -- reopening it builds a
   * fresh frame and drives it back to the page the tab remembers.
   */
  @action
  public closeView(tabId: string) {
    const view = this.views.get(tabId);

    if (!view) {
      return;
    }

    this.dependencies.logger.info(`[K8SIGHT-VIEW]: remove dashboard, tabId=${tabId}`);
    this.views.delete(tabId);

    const recencyIndex = this.recency.indexOf(tabId);

    if (recencyIndex !== -1) {
      this.recency.splice(recencyIndex, 1);
    }

    const { frame } = view;
    const parentElem = frame.parentElement;

    if (!parentElem) {
      return;
    }

    // Must only remove iframe from DOM after it unloads old code. Else it crashes
    frame.addEventListener("load", () => parentElem.removeChild(frame), { once: true });

    // This causes the old code to be unloaded.
    frame.setAttribute("src", "");
  }

  @action
  public closeViewsForCluster(clusterId: ClusterId) {
    for (const [tabId, view] of [...this.views.entries()]) {
      if (view.clusterId === clusterId) {
        this.closeView(tabId);
      }
    }
  }

  private prevVisibleTabChange?: Disposer;

  public setVisibleTab(tabId: string | null): void {
    // Clear the previous when ASAP
    this.prevVisibleTabChange?.();

    this.dependencies.logger.info(`[K8SIGHT-VIEW]: refreshing iframe views, visible tab id=${tabId}`);
    this.dependencies.emitClusterVisibility(null);

    for (const { frame: view } of this.views.values()) {
      view.classList.add("hidden");
    }

    if (!tabId) {
      return;
    }

    this.touch(tabId);

    const clusterId = this.views.get(tabId)?.clusterId;
    const cluster = clusterId ? this.dependencies.getClusterById(clusterId) : undefined;

    if (cluster && clusterId) {
      this.prevVisibleTabChange = onceDefined(
        () => {
          const view = this.views.get(tabId);

          if (cluster.available.get() && cluster.ready.get() && view?.isLoaded) {
            return view;
          }

          return undefined;
        },
        (view: K8sightView) => {
          this.dependencies.logger.info(`[K8SIGHT-VIEW]: tab id=${tabId} should now be visible`);
          view.frame.classList.remove("hidden");
          view.frame.focus();
          this.dependencies.emitClusterVisibility(clusterId);
        },
      );
    }
  }

  public clearVisibleTab() {
    this.setVisibleTab(null);
  }
}
