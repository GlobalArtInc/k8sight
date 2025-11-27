import type { KubeConfig } from "@kubesightapp/kubernetes-client-node";

import type { Cluster } from "../../../common/cluster/cluster";

export function isCurrentContext(config: KubeConfig, cluster: Cluster) {
  return config.currentContext == cluster.contextName.get();
}
