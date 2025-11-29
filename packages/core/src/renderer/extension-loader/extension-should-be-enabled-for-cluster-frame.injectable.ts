import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { asyncComputed } from "@ogre-tools/injectable-react";
import { untracked } from "mobx";
import extensionIsEnabledForClusterInjectable from "../../extensions/extension-loader/extension-is-enabled-for-cluster.injectable";
import activeKubernetesClusterInjectable from "../cluster-frame-context/active-kubernetes-cluster.injectable";

import type { KubernetesCluster } from "../../common/catalog-entities";
import type { K8sightRendererExtension } from "../../extensions/k8sight-renderer-extension";

const extensionShouldBeEnabledForClusterFrameInjectable = getInjectable({
  id: "extension-should-be-enabled-for-cluster-frame",

  instantiate: (di, extension: K8sightRendererExtension) => {
    const activeKubernetesCluster = di.inject(activeKubernetesClusterInjectable);

    const getExtensionIsEnabledForCluster = (extension: K8sightRendererExtension, cluster: KubernetesCluster) =>
      untracked(() => di.inject(extensionIsEnabledForClusterInjectable, { extension, cluster }));

    return asyncComputed({
      getValueFromObservedPromise: async () => {
        const cluster = activeKubernetesCluster.get();

        if (!cluster) {
          return false;
        }

        return getExtensionIsEnabledForCluster(extension, cluster);
      },

      valueWhenPending: false,
    });
  },

  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, extension: K8sightRendererExtension) => extension.sanitizedExtensionId,
  }),
});

export default extensionShouldBeEnabledForClusterFrameInjectable;
