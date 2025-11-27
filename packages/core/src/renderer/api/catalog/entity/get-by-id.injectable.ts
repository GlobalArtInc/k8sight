import { getInjectable } from "@ogre-tools/injectable";
import catalogEntityRegistryInjectable from "./registry.injectable";

import type { CatalogEntity } from "../../catalog-entity";

export type GetEntityById = (id: string) => CatalogEntity | undefined;

const getEntityByIdInjectable = getInjectable({
  id: "get-entity-by-id",
  instantiate: (di): GetEntityById => {
    const catalogEntityRegistry = di.inject(catalogEntityRegistryInjectable);

    return (id) => catalogEntityRegistry.getById(id);
  },
});

export default getEntityByIdInjectable;
