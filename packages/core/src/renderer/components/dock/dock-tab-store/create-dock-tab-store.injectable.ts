import { getInjectable } from "@ogre-tools/injectable";
import createStorageInjectable from "../../../utils/create-storage/create-storage.injectable";
import { DockTabStore } from "./dock-tab.store";

import type { DockTabStoreOptions } from "./dock-tab.store";

const createDockTabStoreInjectable = getInjectable({
  id: "create-dock-tab-store",

  instantiate: (di) => {
    const dependencies = {
      createStorage: di.inject(createStorageInjectable),
    };

    return <T>(options: DockTabStoreOptions = {}) => new DockTabStore<T>(dependencies, options);
  },
});

export default createDockTabStoreInjectable;
