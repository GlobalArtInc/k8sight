import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { clusterStateSyncChannel } from "../common/channels";

import type { ClusterStateSync } from "../common/channels";

const emitClusterStateUpdateInjectable = getInjectable({
  id: "emit-cluster-state-update",
  instantiate: (di) => {
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);

    return (message: ClusterStateSync) => sendMessageToChannel(clusterStateSyncChannel, message);
  },
});

export default emitClusterStateUpdateInjectable;
