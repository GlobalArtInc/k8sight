import { getInjectable } from "@ogre-tools/injectable";
import dockStoreInjectable from "./store.injectable";

import type { TabId } from "./store";

const closeDockTabInjectable = getInjectable({
  id: "close-dock-tab",

  instantiate: (di) => {
    const dockStore = di.inject(dockStoreInjectable);

    return (tabId: TabId): void => {
      dockStore.closeTab(tabId);
    };
  },
});

export default closeDockTabInjectable;
