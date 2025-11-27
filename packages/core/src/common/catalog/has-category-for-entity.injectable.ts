import { getInjectable } from "@ogre-tools/injectable";
import catalogCategoryRegistryInjectable from "./category-registry.injectable";

import type { CatalogEntityData, CatalogEntityKindData } from "./catalog-entity";

export type HasCategoryForEntity = (data: CatalogEntityData & CatalogEntityKindData) => boolean;

const hasCategoryForEntityInjectable = getInjectable({
  id: "has-category-for-entity",

  instantiate: (di): HasCategoryForEntity => {
    const registry = di.inject(catalogCategoryRegistryInjectable);

    return (data) => registry.hasCategoryForEntity(data);
  },
});

export default hasCategoryForEntityInjectable;
