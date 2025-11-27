import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { isKubernetesCluster } from "../../common/catalog-entities";
import catalogEntityRegistryInjectable from "../api/catalog/entity/registry.injectable";

const activeKubernetesClusterInjectable = getInjectable({
  id: "active-kubernetes-cluster",

  instantiate: (di) => {
    const catalogEntityRegistry = di.inject(catalogEntityRegistryInjectable);

    return computed(() => {
      const activeEntity = catalogEntityRegistry.activeEntity;

      if (!isKubernetesCluster(activeEntity)) {
        return null;
      }

      return activeEntity;
    });
  },
});

export default activeKubernetesClusterInjectable;
