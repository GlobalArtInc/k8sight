import { beforeApplicationIsLoadingInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import { buildVersionInitializationInjectable } from "../../vars/build-version/main/init.injectable";
import userPreferencesPersistentStorageInjectable from "../common/storage.injectable";

const loadUserPreferencesStorageInjectable = getInjectable({
  id: "load-user-preferences-storage",
  instantiate: (di) => ({
    run: async () => {
      const storage = di.inject(userPreferencesPersistentStorageInjectable);

      storage.loadAndStartSyncing();
    },
    runAfter: buildVersionInitializationInjectable,
  }),
  injectionToken: beforeApplicationIsLoadingInjectionToken,
});

export default loadUserPreferencesStorageInjectable;
