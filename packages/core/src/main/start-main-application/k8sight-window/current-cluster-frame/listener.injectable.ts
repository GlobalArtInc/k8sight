import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import { currentClusterMessageChannel } from "../../../../common/cluster/current-cluster-channel";
import currentClusterFrameClusterIdStateInjectable from "./current-cluster-frame-cluster-id-state.injectable";

const currentVisibleClusterListenerInjectable = getMessageChannelListenerInjectable({
  id: "current-visible-cluster",
  channel: currentClusterMessageChannel,
  getHandler: (di) => {
    const currentClusterFrameState = di.inject(currentClusterFrameClusterIdStateInjectable);

    return (clusterId) => currentClusterFrameState.set(clusterId);
  },
});

export default currentVisibleClusterListenerInjectable;
