import { getInjectable } from "@ogre-tools/injectable";
import logTabStoreInjectable from "./tab-store.injectable";

import type { LogTabData } from "./tab-store";

const setLogTabDataInjectable = getInjectable({
  id: "set-log-tab-data",

  instantiate: (di) => {
    const logTabStore = di.inject(logTabStoreInjectable);

    return (tabId: string, data: LogTabData): void => logTabStore.setData(tabId, data);
  },
});

export default setLogTabDataInjectable;
