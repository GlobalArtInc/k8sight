import { getInjectable } from "@ogre-tools/injectable";
import logTabStoreInjectable from "./tab-store.injectable";

import type { TabId } from "../dock/store";

const clearLogTabDataInjectable = getInjectable({
  id: "clear-log-tab-data",

  instantiate: (di) => {
    const logTabStore = di.inject(logTabStoreInjectable);

    return (tabId: TabId): void => {
      logTabStore.clearData(tabId);
    };
  },
});

export default clearLogTabDataInjectable;
