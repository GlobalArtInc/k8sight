import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import weblinksPersistentStorageInjectable from "../common/storage.injectable";

const loadWeblinkStorageInjectable = getInjectable({
  id: "load-weblink-storage",
  instantiate: (di) => ({
    run: () => {
      const storage = di.inject(weblinksPersistentStorageInjectable);

      storage.loadAndStartSyncing();
    },
  }),
  injectionToken: onLoadOfApplicationInjectionToken,
});

export default loadWeblinkStorageInjectable;
