import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import listClusterHelmReleasesInjectable from "../../../main/helm/helm-service/list-helm-releases.injectable";
import getClusterByIdInjectable from "../../cluster/storage/common/get-by-id.injectable";
import { listHelmReleasesChannel } from "../common/channels";

const handleListHelmReleasesInjectable = getRequestChannelListenerInjectable({
  channel: listHelmReleasesChannel,
  id: "handle-list-helm-releases",
  getHandler: (di) => {
    const listClusterHelmReleases = di.inject(listClusterHelmReleasesInjectable);
    const getClusterById = di.inject(getClusterByIdInjectable);

    return async ({ clusterId, namespace }) => {
      const cluster = getClusterById(clusterId);

      if (!cluster) {
        return {
          callWasSuccessful: false,
          error: `Cluster with id "${clusterId}" not found`,
        };
      }

      return listClusterHelmReleases(cluster, namespace);
    };
  },
});

export default handleListHelmReleasesInjectable;
