import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { clusterVisibilityChannel } from "../../../common/cluster/visibility-channel";

import type { ClusterId } from "../../../common/cluster-types";

const emitClusterVisibilityInjectable = getInjectable({
  id: "emit-cluster-visibility",
  instantiate: (di) => {
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);

    return (id: ClusterId | null) => sendMessageToChannel(clusterVisibilityChannel, id);
  },
});

export default emitClusterVisibilityInjectable;
