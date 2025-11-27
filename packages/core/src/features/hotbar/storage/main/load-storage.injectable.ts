import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import setupSyncingOfGeneralCatalogEntitiesInjectable from "../../../../main/start-main-application/runnables/setup-syncing-of-general-catalog-entities.injectable";
import hotbarsPersistentStorageInjectable from "../common/storage.injectable";

const loadHotbarStorageInjectable = getInjectable({
  id: "load-hotbar-storage",
  instantiate: (di) => ({
    run: () => {
      const storage = di.inject(hotbarsPersistentStorageInjectable);

      storage.loadAndStartSyncing();
    },
    runAfter: setupSyncingOfGeneralCatalogEntitiesInjectable,
  }),
  injectionToken: onLoadOfApplicationInjectionToken,
});

export default loadHotbarStorageInjectable;
