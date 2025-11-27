import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import getClusterByIdInjectable from "../../../../features/cluster/storage/common/get-by-id.injectable";
import activeEntityIdInjectable from "./active-entity-id.injectable";

const activeEntityInternalClusterInjectable = getInjectable({
  id: "active-entity-internal-cluster",
  instantiate: (di) => {
    const getClusterById = di.inject(getClusterByIdInjectable);
    const activeEntityId = di.inject(activeEntityIdInjectable);

    return computed(() => {
      const entityId = activeEntityId.get();

      if (entityId) {
        return getClusterById(entityId);
      }

      return undefined;
    });
  },
});

export default activeEntityInternalClusterInjectable;
