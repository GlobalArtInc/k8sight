import type { ClusterId } from "../../../common/cluster-types";

/**
 * A single dashboard tab in the root frame's tab strip.
 *
 * Every tab owns its own cluster frame (an `<iframe>`), which is why the tab id -- and not the
 * cluster id -- is what {@link ClusterFrameHandler} keys its views by. Two tabs may therefore point
 * at the same cluster while showing different pages.
 */
export interface DashboardTab {
  readonly id: string;

  readonly clusterId: ClusterId;

  /**
   * The route inside the cluster frame, e.g. `/workloads/pods`.
   *
   * Kept in sync by the frame itself, which reports navigations over
   * {@link tabRouteChangedChannel}. Used to restore the tab after its frame has been evicted.
   */
  path: string;

  /**
   * The human readable name of the page the tab is showing, e.g. `Pods`.
   */
  title: string;

  /**
   * Pinned tabs sort ahead of unpinned ones and are left alone by the bulk close actions.
   *
   * Left absent rather than written as `false` so that never pinning a tab costs nothing in the
   * persisted state.
   */
  pinned?: boolean;
}
