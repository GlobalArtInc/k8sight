import { getInjectable } from "@ogre-tools/injectable";
import terminalStoreInjectable from "./store.injectable";

import type { TabId } from "../dock/store";

const clearTerminalTabDataInjectable = getInjectable({
  id: "clear-terminal-tab-data",

  instantiate: (di) => {
    const terminalStore = di.inject(terminalStoreInjectable);

    return (tabId: TabId): void => {
      terminalStore.destroy(tabId);
    };
  },
});

export default clearTerminalTabDataInjectable;
