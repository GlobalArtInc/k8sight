import { getInjectable } from "@ogre-tools/injectable";
import catalogEntitySettingItemsInjectable from "./settings.injectable";

import type { CatalogEntity } from "../../api/catalog-entity";

export type HasCatalogEntitySettingItems = (entity: CatalogEntity) => boolean;

const hasCatalogEntitySettingItemsInjectable = getInjectable({
  id: "has-catalog-entity-setting-items",
  instantiate:
    (di): HasCatalogEntitySettingItems =>
    (entity) => {
      const items = di.inject(catalogEntitySettingItemsInjectable, entity);

      return items.get().length > 0;
    },
});

export default hasCatalogEntitySettingItemsInjectable;
