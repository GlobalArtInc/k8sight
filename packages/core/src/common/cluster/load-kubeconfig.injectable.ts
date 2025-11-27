import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import loadConfigFromFileInjectable from "../kube-helpers/load-config-from-file.injectable";

import type { KubeConfig } from "@kubesightapp/kubernetes-client-node";

import type { ConfigResult } from "../kube-helpers";
import type { Cluster } from "./cluster";

export interface LoadKubeconfig {
  (fullResult?: false): Promise<KubeConfig>;
  (fullResult: true): Promise<ConfigResult>;
}

const loadKubeconfigInjectable = getInjectable({
  id: "load-kubeconfig",
  instantiate: (di, cluster) => {
    const loadConfigFromFile = di.inject(loadConfigFromFileInjectable);

    return (async (fullResult = false) => {
      const result = await loadConfigFromFile(cluster.kubeConfigPath.get());

      if (fullResult) {
        return result;
      }

      return result.config;
    }) as LoadKubeconfig;
  },
  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, cluster: Cluster) => cluster.id,
  }),
});

export default loadKubeconfigInjectable;
