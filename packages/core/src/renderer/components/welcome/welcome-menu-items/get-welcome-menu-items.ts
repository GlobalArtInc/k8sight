import { computed } from "mobx";

import type { IComputedValue } from "mobx";

import type { NavigateToCatalog } from "../../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import type { K8sightRendererExtension } from "../../../../extensions/k8sight-renderer-extension";

interface Dependencies {
  extensions: IComputedValue<K8sightRendererExtension[]>;
  navigateToCatalog: NavigateToCatalog;
}

export const getWelcomeMenuItems = ({ extensions, navigateToCatalog }: Dependencies) => {
  const browseClusters = {
    title: "Browse Clusters in Catalog",
    icon: "view_list",

    click: () =>
      navigateToCatalog({
        group: "entity.k8sk8sight.dev",
        kind: "KubernetesCluster",
      }),
  };

  return computed(() => [browseClusters, ...extensions.get().flatMap((extension) => extension.welcomeMenus)]);
};
