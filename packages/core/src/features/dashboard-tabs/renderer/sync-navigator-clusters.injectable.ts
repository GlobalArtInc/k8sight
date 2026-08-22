import { getInjectable } from "@ogre-tools/injectable";
import { reaction, runInAction } from "mobx";
import { beforeMainFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import expandedClustersInjectable from "./expanded-clusters.injectable";
import dashboardTabsStoreInjectable from "./tabs-store.injectable";

/**
 * Keeps the navigator's unfolded clusters honest.
 *
 * Gaining a tab unfolds a cluster, losing its last one folds it again -- that is also when the
 * connection goes, so leaving it unfolded would strand it on "Connecting...".
 * Raising the frame an unfolded cluster needs is the navigator's own job, since that cannot happen
 * until the DOM it lives in exists.
 *
 * Folding keys off the moment a cluster loses its tabs rather than off "has no tabs", so a cluster
 * someone unfolded by hand -- which never had a tab to begin with -- is left alone.
 */
const syncNavigatorClustersInjectable = getInjectable({
  id: "sync-navigator-clusters",

  instantiate: (di) => {
    const store = di.inject(dashboardTabsStoreInjectable);
    const expandedClusters = di.inject(expandedClustersInjectable);

    return {
      run: () => {
        reaction(
          () => new Set(store.tabs.get().map((tab) => tab.clusterId)),

          (withTabs, previouslyWithTabs) => {
            runInAction(() => {
              for (const clusterId of withTabs) {
                expandedClusters.add(clusterId);
              }

              // Undefined on the very first run, when nothing has been lost yet.
              for (const clusterId of previouslyWithTabs ?? []) {
                if (!withTabs.has(clusterId)) {
                  expandedClusters.delete(clusterId);
                }
              }
            });
          },

          { fireImmediately: true },
        );
      },
    };
  },

  injectionToken: beforeMainFrameStartsSecondInjectionToken,
});

export default syncNavigatorClustersInjectable;
