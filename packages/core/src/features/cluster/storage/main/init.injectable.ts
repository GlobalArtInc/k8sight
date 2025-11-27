import { beforeApplicationIsLoadingInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import loadUserPreferencesStorageInjectable from "../../../user-preferences/main/load-storage.injectable";
import clustersPersistentStorageInjectable from "../common/storage.injectable";

const initClusterStoreInjectable = getInjectable({
  id: "init-cluster-store",
  instantiate: (di) => ({
    run: () => {
      const storage = di.inject(clustersPersistentStorageInjectable);

      storage.loadAndStartSyncing();
    },
    runAfter: loadUserPreferencesStorageInjectable,
  }),
  injectionToken: beforeApplicationIsLoadingInjectionToken,
});

export default initClusterStoreInjectable;
