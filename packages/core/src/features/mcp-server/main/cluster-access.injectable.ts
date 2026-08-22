import { CoreV1Api, KubernetesObjectApi } from "@kubesightapp/kubernetes-client-node";
import { getInjectable } from "@ogre-tools/injectable";
import getClusterByIdInjectable from "../../cluster/storage/common/get-by-id.injectable";
import clustersInjectable from "../../cluster/storage/common/clusters.injectable";
import loadProxyKubeconfigInjectable from "../../../main/cluster/load-proxy-kubeconfig.injectable";

import type { KubeConfig } from "@kubesightapp/kubernetes-client-node";

import type { Cluster } from "../../../common/cluster/cluster";

export interface McpClusterAccess {
  listClusters: () => Cluster[];
  getCluster: (clusterId: string) => Cluster;
  /**
   * The kubeconfig pointing at this cluster's local auth proxy.
   *
   * Going through the proxy rather than the raw kubeconfig means exec plugins, OIDC refreshes and
   * the like are already handled -- the same path the app's own requests take.
   */
  kubeconfigFor: (cluster: Cluster) => Promise<KubeConfig>;
  objectApiFor: (clusterId: string) => Promise<KubernetesObjectApi>;
  coreApiFor: (clusterId: string) => Promise<CoreV1Api>;
}

const mcpClusterAccessInjectable = getInjectable({
  id: "mcp-cluster-access",

  instantiate: (di): McpClusterAccess => {
    const getClusterById = di.inject(getClusterByIdInjectable);
    const clusters = di.inject(clustersInjectable);

    const access: McpClusterAccess = {
      listClusters: () => clusters.get(),

      getCluster: (clusterId) => {
        const cluster = getClusterById(clusterId);

        if (!cluster) {
          throw new Error(`Unknown cluster "${clusterId}". Call list_clusters first.`);
        }

        return cluster;
      },

      kubeconfigFor: (cluster) => di.inject(loadProxyKubeconfigInjectable, cluster)(),

      objectApiFor: async (clusterId) =>
        KubernetesObjectApi.makeApiClient(await access.kubeconfigFor(access.getCluster(clusterId))),

      coreApiFor: async (clusterId) =>
        (await access.kubeconfigFor(access.getCluster(clusterId))).makeApiClient(CoreV1Api),
    };

    return access;
  },
});

export default mcpClusterAccessInjectable;
