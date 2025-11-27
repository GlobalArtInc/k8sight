import { getInjectable } from "@ogre-tools/injectable";
import hasCategoryForEntityInjectable from "../../common/catalog/has-category-for-entity.injectable";
import { CatalogEntityRegistry } from "./entity-registry";

const catalogEntityRegistryInjectable = getInjectable({
  id: "catalog-entity-registry",

  instantiate: (di) =>
    new CatalogEntityRegistry({
      hasCategoryForEntity: di.inject(hasCategoryForEntityInjectable),
    }),
});

export default catalogEntityRegistryInjectable;
