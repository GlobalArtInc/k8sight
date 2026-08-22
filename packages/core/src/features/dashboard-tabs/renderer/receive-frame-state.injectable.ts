import { getInjectable } from "@ogre-tools/injectable";
import { runInAction } from "mobx";
import { beforeMainFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import clusterFrameHandlerInjectable from "../../../renderer/components/cluster-manager/cluster-frame-handler.injectable";
import { isFrameStateMessage } from "../common/frame-bridge";
import frameCommandsInjectable from "./frame-commands.injectable";
import frameStatesInjectable from "./frame-states.injectable";
import dashboardTabsStoreInjectable from "./tabs-store.injectable";

import type { FrameState } from "./frame-states.injectable";

/**
 * Takes in what the cluster frames report and fans it out to the tab strip and the navigator.
 *
 * The sender is identified by matching the event's source window against the frames we created,
 * so an unrecognised window -- anything we did not put on the page -- is ignored.
 */
const receiveFrameStateInjectable = getInjectable({
  id: "receive-frame-state",

  instantiate: (di) => {
    const clusterFrames = di.inject(clusterFrameHandlerInjectable);
    const frameStates = di.inject(frameStatesInjectable);
    const frameCommands = di.inject(frameCommandsInjectable);
    const store = di.inject(dashboardTabsStoreInjectable);

    return {
      run: () => {
        window.addEventListener("message", (event) => {
          if (!isFrameStateMessage(event.data)) {
            return;
          }

          const viewId = clusterFrames.findViewIdByContentWindow(event.source);
          const clusterId = viewId && clusterFrames.clusterIdOfView(viewId);

          if (!viewId || !clusterId) {
            return;
          }

          const { path, title, visibleItemIds, activeItemIds, items } = event.data;
          const state: FrameState = {
            clusterId,
            path,
            title,
            visibleItemIds: new Set(visibleItemIds),
            activeItemIds: new Set(activeItemIds),
            items,
          };

          runInAction(() => frameStates.set(viewId, state));

          // A frame that has not yet carried out its instruction is reporting where it booted, not
          // where it was asked to go; steer it rather than recording the wrong page.
          const outstanding = frameCommands.reconcile(viewId, state);

          if (outstanding) {
            clusterFrames.postToView(viewId, outstanding);

            return;
          }

          store.syncTabFromFrame(viewId, path, title);
        });
      },
    };
  },

  injectionToken: beforeMainFrameStartsSecondInjectionToken,
});

export default receiveFrameStateInjectable;
