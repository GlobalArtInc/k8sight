import { getInjectable } from "@ogre-tools/injectable";
import { reaction, runInAction } from "mobx";
import { beforeMainFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import clusterFrameHandlerInjectable from "../../../renderer/components/cluster-manager/cluster-frame-handler.injectable";
import requestClusterDeactivationInjectable from "../../cluster/activation/renderer/request-deactivation.injectable";
import frameCommandsInjectable from "./frame-commands.injectable";
import frameStatesInjectable from "./frame-states.injectable";
import dashboardTabsStoreInjectable from "./tabs-store.injectable";

/**
 * Releases what a tab was holding once it is closed: its frame, and -- when it was the cluster's
 * last tab -- the connection to the cluster itself.
 *
 * Tabs are closed from several places (the strip, a cluster leaving the catalog, a picker
 * retargeting one), so this lives in one reaction rather than at each call site. Frame teardown
 * and disconnecting share it deliberately: the check for remaining frames has to see the ones this
 * pass just removed, which it would not if the two ran as separate reactions.
 */
const releaseClosedTabsInjectable = getInjectable({
  id: "release-closed-tabs",

  instantiate: (di) => {
    const store = di.inject(dashboardTabsStoreInjectable);
    const clusterFrames = di.inject(clusterFrameHandlerInjectable);
    const frameCommands = di.inject(frameCommandsInjectable);
    const frameStates = di.inject(frameStatesInjectable);
    const requestClusterDeactivation = di.inject(requestClusterDeactivationInjectable);

    return {
      run: () => {
        reaction(
          () => store.tabs.get().map((tab) => ({ id: tab.id, clusterId: tab.clusterId })),

          (tabs, previousTabs) => {
            const tabIds = new Set(tabs.map((tab) => tab.id));
            const closed = previousTabs.filter((tab) => !tabIds.has(tab.id));

            for (const tab of closed) {
              frameCommands.forget(tab.id);
              runInAction(() => frameStates.delete(tab.id));
              clusterFrames.closeView(tab.id);
            }

            // Only disconnect once nothing is left looking at the cluster -- neither another tab
            // nor a frame the navigator raised to list the cluster's pages.
            const stillWanted = new Set(tabs.map((tab) => tab.clusterId));

            for (const clusterId of new Set(closed.map((tab) => tab.clusterId))) {
              if (!stillWanted.has(clusterId) && clusterFrames.viewIdsForCluster(clusterId).length === 0) {
                void requestClusterDeactivation(clusterId);
              }
            }
          },

          { equals: (a, b) => a.length === b.length && a.every((tab, index) => tab.id === b[index]?.id) },
        );
      },
    };
  },

  injectionToken: beforeMainFrameStartsSecondInjectionToken,
});

export default releaseClosedTabsInjectable;
