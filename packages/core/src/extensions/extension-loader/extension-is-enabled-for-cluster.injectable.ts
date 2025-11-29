import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";

import type { KubernetesCluster } from "../../common/catalog-entities";
import type { K8sightRendererExtension } from "../k8sight-renderer-extension";

interface ExtensionIsEnabledForCluster {
  extension: K8sightRendererExtension;
  cluster: KubernetesCluster;
}

const extensionIsEnabledForClusterInjectable = getInjectable({
  id: "extension-is-enabled-for-cluster",

  instantiate: async (di, { extension, cluster }: ExtensionIsEnabledForCluster) =>
    (await extension.isEnabledForCluster(cluster)) as boolean,

  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, { extension, cluster }: ExtensionIsEnabledForCluster) =>
      `${extension.sanitizedExtensionId}-${cluster.getId()}`,
  }),
});

export default extensionIsEnabledForClusterInjectable;
