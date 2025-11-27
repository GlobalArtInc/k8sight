import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import clustersThatAreBeingDeletedInjectable from "../../../../main/cluster/are-being-deleted.injectable";
import { setClusterAsDeletingChannel } from "../common/set-as-deleting-channel";

const setClusterAsDeletingChannelHandlerInjectable = getRequestChannelListenerInjectable({
  id: "set-cluster-as-deleting-channel-handler",
  channel: setClusterAsDeletingChannel,
  getHandler: (di) => {
    const clustersThatAreBeingDeleted = di.inject(clustersThatAreBeingDeletedInjectable);

    return (clusterId) => {
      clustersThatAreBeingDeleted.add(clusterId);
    };
  },
});

export default setClusterAsDeletingChannelHandlerInjectable;
