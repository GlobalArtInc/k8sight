import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { StorageHelper } from "./storage-helper";

import type { StorageHelperDependencies, StorageHelperOptions } from "./storage-helper";

export type CreateStorageHelper = <T>(key: string, options: StorageHelperOptions<T>) => StorageHelper<T>;

const createStorageHelperInjectable = getInjectable({
  id: "create-storage-helper",
  instantiate: (di): CreateStorageHelper => {
    const deps: StorageHelperDependencies = {
      logger: di.inject(loggerInjectionToken),
    };

    return (key, options) => new StorageHelper(deps, key, options);
  },
});

export default createStorageHelperInjectable;
