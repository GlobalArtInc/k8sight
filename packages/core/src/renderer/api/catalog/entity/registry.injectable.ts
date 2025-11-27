import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import catalogCategoryRegistryInjectable from "../../../../common/catalog/category-registry.injectable";
import navigateInjectable from "../../../navigation/navigate.injectable";
import { CatalogEntityRegistry } from "./registry";

const catalogEntityRegistryInjectable = getInjectable({
  id: "catalog-entity-registry",
  instantiate: (di) =>
    new CatalogEntityRegistry({
      categoryRegistry: di.inject(catalogCategoryRegistryInjectable),
      navigate: di.inject(navigateInjectable),
      logger: di.inject(loggerInjectionToken),
    }),
});

export default catalogEntityRegistryInjectable;
