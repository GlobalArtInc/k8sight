import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import activeEntityInternalClusterInjectable from "../../api/catalog/entity/get-active-cluster-entity.injectable";

const clusterNameInjectable = getInjectable({
  id: "cluster-name",
  instantiate: (di) => {
    const activeEntityInternalCluster = di.inject(activeEntityInternalClusterInjectable);

    return computed(() => activeEntityInternalCluster.get()?.name.get());
  },
});

export default clusterNameInjectable;
