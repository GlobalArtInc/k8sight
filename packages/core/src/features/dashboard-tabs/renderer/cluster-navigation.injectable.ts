import { getInjectable } from "@ogre-tools/injectable";
import { computed, runInAction } from "mobx";
import navigateToClusterViewInjectable from "../../../common/front-end-routing/routes/cluster-view/navigate-to-cluster-view.injectable";
import clusterFrameHandlerInjectable from "../../../renderer/components/cluster-manager/cluster-frame-handler.injectable";
import requestClusterActivationInjectable from "../../cluster/activation/renderer/request-activation.injectable";
import requestClusterDeactivationInjectable from "../../cluster/activation/renderer/request-deactivation.injectable";
import frameCommandsInjectable from "./frame-commands.injectable";
import frameStatesInjectable from "./frame-states.injectable";
import dashboardTabsStoreInjectable from "./tabs-store.injectable";

import type { IComputedValue } from "mobx";

import type { ClusterId } from "../../../common/cluster-types";
import type { FrameState } from "./frame-states.injectable";

/**
 * A frame raised purely so the navigator can find out what a cluster serves, with no tab behind it.
 *
 * Expanding a cluster in the navigator has to show its pages, and only the cluster's own frame
 * knows which ones exist -- but expanding is not the same as opening something, so it must not
 * leave a tab behind.
 */
const navigatorViewId = (clusterId: ClusterId) => `navigator:${clusterId}`;

export interface ClusterNavigation {
  /** What the cluster's frame last reported, from whichever of its frames is most current. */
  stateFor: (clusterId: ClusterId) => IComputedValue<FrameState | undefined>;
  /** Raises a frame for the cluster if none is live, so its pages can be listed. */
  reveal: (clusterId: ClusterId) => void;
  /** Drops a navigator-only frame once its cluster is collapsed again. */
  conceal: (clusterId: ClusterId) => void;
  /** Opens a cluster's page in a tab, reusing the cluster's most recent tab. */
  openItem: (clusterId: ClusterId, itemId: string) => void;
}

const clusterNavigationInjectable = getInjectable({
  id: "cluster-navigation",

  instantiate: (di): ClusterNavigation => {
    const clusterFrames = di.inject(clusterFrameHandlerInjectable);
    const frameStates = di.inject(frameStatesInjectable);
    const frameCommands = di.inject(frameCommandsInjectable);
    const store = di.inject(dashboardTabsStoreInjectable);
    const navigateToClusterView = di.inject(navigateToClusterViewInjectable);
    const requestClusterActivation = di.inject(requestClusterActivationInjectable);
    const requestClusterDeactivation = di.inject(requestClusterDeactivationInjectable);

    const stateFor = (clusterId: ClusterId) =>
      computed(() => {
        for (const [viewId, state] of frameStates) {
          if (state.clusterId === clusterId && clusterFrames.hasView(viewId)) {
            return state;
          }
        }

        return undefined;
      });

    return {
      stateFor,

      reveal: (clusterId) => {
        if (clusterFrames.viewIdsForCluster(clusterId).length > 0) {
          return;
        }

        // A frame sits waiting for its cluster to be ready, so listing a cluster's pages means
        // connecting to it -- there is no other way to know which resources it serves.
        void requestClusterActivation({ clusterId });

        const tab = [...store.tabs.get()].reverse().find((tab) => tab.clusterId === clusterId);

        clusterFrames.initView(tab ?? { id: navigatorViewId(clusterId), clusterId });
      },

      conceal: (clusterId) => {
        const viewId = navigatorViewId(clusterId);

        frameCommands.forget(viewId);
        runInAction(() => frameStates.delete(viewId));
        clusterFrames.closeView(viewId);

        // Collapsing only ends the connection the navigator itself opened; a cluster someone is
        // actually working in keeps it.
        if (
          !store.tabs.get().some((tab) => tab.clusterId === clusterId) &&
          clusterFrames.viewIdsForCluster(clusterId).length === 0
        ) {
          void requestClusterDeactivation(clusterId);
        }
      },

      openItem: (clusterId, itemId) => {
        const tab = store.focusOrOpenForCluster(clusterId);

        clusterFrames.initView(tab);
        navigateToClusterView(clusterId);

        const command = {
          message: { kind: "k8sight:activate-sidebar-item", itemId } as const,
          isSatisfied: (state: FrameState) => state.activeItemIds.has(itemId),
        };

        frameCommands.request(tab.id, command);

        // A frame that is already up will not report again on its own, so nudge it now; a frame
        // still booting picks the instruction up when it first reports.
        if (frameStates.has(tab.id)) {
          clusterFrames.postToView(tab.id, command.message);
        }

        // The navigator's own frame for this cluster has served its purpose now that a tab has one.
        clusterFrames.closeView(navigatorViewId(clusterId));
      },
    };
  },
});

export default clusterNavigationInjectable;
