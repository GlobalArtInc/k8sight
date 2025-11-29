import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { noop } from "@kubesightapp/utilities";
import emitAppEventInjectable from "../../../../common/app-event-bus/emit-event.injectable";
import clusterFramesInjectable from "../../../../common/cluster-frames.injectable";
import directoryForK8sightLocalStorageInjectable from "../../../../common/directory-for-k8sight-local-storage/directory-for-k8sight-local-storage.injectable";
import removePathInjectable from "../../../../common/fs/remove.injectable";
import joinPathsInjectable from "../../../../common/path/join-paths.injectable";
import clusterConnectionInjectable from "../../../../main/cluster/cluster-connection.injectable";
import clustersStateInjectable from "../../storage/common/state.injectable";
import { deleteClusterChannel } from "../common/delete-channel";

const deleteClusterChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "delete-cluster-channel-listener",
  channel: deleteClusterChannel,
  getHandler: (di) => {
    const emitAppEvent = di.inject(emitAppEventInjectable);
    const clusterFrames = di.inject(clusterFramesInjectable);
    const joinPaths = di.inject(joinPathsInjectable);
    const directoryForK8sightLocalStorage = di.inject(directoryForK8sightLocalStorageInjectable);
    const deleteFile = di.inject(removePathInjectable);
    const clustersState = di.inject(clustersStateInjectable);

    return async (clusterId) => {
      emitAppEvent({ name: "cluster", action: "remove" });

      const cluster = clustersState.get(clusterId);

      if (!cluster) {
        return;
      }

      const clusterConnection = di.inject(clusterConnectionInjectable, cluster);

      clusterConnection.disconnect();
      clusterFrames.delete(cluster.id);
      clustersState.delete(cluster.id);

      // remove the local storage file
      const localStorageFilePath = joinPaths(directoryForK8sightLocalStorage, `${cluster.id}.json`);

      await deleteFile(localStorageFilePath).catch(noop);
    };
  },
});

export default deleteClusterChannelListenerInjectable;
