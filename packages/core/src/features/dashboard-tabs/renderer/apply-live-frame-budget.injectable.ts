import { getInjectable } from "@ogre-tools/injectable";
import { autorun } from "mobx";
import { beforeMainFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import clusterFrameHandlerInjectable from "../../../renderer/components/cluster-manager/cluster-frame-handler.injectable";
import userPreferencesStateInjectable from "../../user-preferences/common/state.injectable";

/**
 * Keeps the frame handler's live-frame budget on whatever the user has asked for.
 *
 * Runs in the root frame only -- it is the one that owns the cluster frames -- and re-applies on
 * every change so that lowering the budget frees memory without waiting for a restart.
 */
const applyLiveFrameBudgetInjectable = getInjectable({
  id: "apply-live-frame-budget",

  instantiate: (di) => {
    const clusterFrames = di.inject(clusterFrameHandlerInjectable);
    const state = di.inject(userPreferencesStateInjectable);

    return {
      run: () => {
        autorun(() => clusterFrames.setMaxLiveFrames(state.maxLiveClusterFrames));
      },
    };
  },

  injectionToken: beforeMainFrameStartsSecondInjectionToken,
});

export default applyLiveFrameBudgetInjectable;
