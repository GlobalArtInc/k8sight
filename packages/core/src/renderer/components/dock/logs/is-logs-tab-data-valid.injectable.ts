import { getInjectable } from "@ogre-tools/injectable";
import logTabStoreInjectable from "./tab-store.injectable";

import type { TabId } from "../dock/store";

const isLogsTabDataValidInjectable = getInjectable({
  id: "is-logs-tab-data-valid",

  instantiate: (di) => {
    const logTabStore = di.inject(logTabStoreInjectable);

    return (tabId: TabId) => logTabStore.isDataValid(tabId);
  },
});

export default isLogsTabDataValidInjectable;
