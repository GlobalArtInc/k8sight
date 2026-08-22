import { getInjectable } from "@ogre-tools/injectable";
import { reaction } from "mobx";
import { beforeMainFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import catalogEntityRegistryInjectable from "../../../renderer/api/catalog/entity/registry.injectable";
import dashboardTabsStoreInjectable from "./tabs-store.injectable";

/**
 * Drops tabs whose cluster is no longer in the catalog.
 *
 * Only removal counts -- a merely disconnected cluster keeps its tabs, and clicking one reconnects
 * it. The catalog starts out empty while entities load, so nothing is pruned until it has filled;
 * otherwise every tab restored from the previous session would be discarded on launch.
 */
const closeTabsOfRemovedClustersInjectable = getInjectable({
  id: "close-tabs-of-removed-clusters",

  instantiate: (di) => {
    const store = di.inject(dashboardTabsStoreInjectable);
    const entityRegistry = di.inject(catalogEntityRegistryInjectable);

    return {
      run: () => {
        reaction(
          () => entityRegistry.items.get().map((entity) => entity.getId()),

          (entityIds) => {
            if (entityIds.length === 0) {
              return;
            }

            const known = new Set(entityIds);

            for (const clusterId of new Set(store.tabs.get().map((tab) => tab.clusterId))) {
              if (!known.has(clusterId)) {
                store.closeTabsForCluster(clusterId);
              }
            }
          },
        );
      },
    };
  },

  injectionToken: beforeMainFrameStartsSecondInjectionToken,
});

export default closeTabsOfRemovedClustersInjectable;
