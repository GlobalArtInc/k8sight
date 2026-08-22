import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import clusterFramesInjectable from "../../../../common/cluster-frames.injectable";
import currentClusterFrameClusterIdStateInjectable from "./current-cluster-frame-cluster-id-state.injectable";

const currentClusterFrameInjectable = getInjectable({
  id: "current-cluster-frame",

  instantiate: (di) => {
    const currentClusterFrameState = di.inject(currentClusterFrameClusterIdStateInjectable);
    const clusterFrames = di.inject(clusterFramesInjectable);

    return computed(() => {
      const clusterId = currentClusterFrameState.get();

      if (!clusterId) {
        return undefined;
      }

      // A cluster can be open in several tabs; reloading targets the most recently registered of
      // its frames, which is the one the window most recently brought up.
      return [...clusterFrames.values()].reverse().find((frame) => frame.clusterId === clusterId);
    });
  },
});

export default currentClusterFrameInjectable;
