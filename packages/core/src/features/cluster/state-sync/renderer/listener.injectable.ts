import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import getClusterByIdInjectable from "../../storage/common/get-by-id.injectable";
import { clusterStateSyncChannel } from "../common/channels";

const clusterStateListenerInjectable = getMessageChannelListenerInjectable({
  channel: clusterStateSyncChannel,
  id: "main",
  getHandler: (di) => {
    const getClusterById = di.inject(getClusterByIdInjectable);

    return ({ clusterId, state }) => getClusterById(clusterId)?.setState(state);
  },
});

export default clusterStateListenerInjectable;
