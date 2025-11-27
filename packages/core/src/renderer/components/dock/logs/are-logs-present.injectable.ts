import { getInjectable } from "@ogre-tools/injectable";
import logStoreInjectable from "./store.injectable";

import type { TabId } from "../dock/store";

const areLogsPresentInjectable = getInjectable({
  id: "are-logs-present",

  instantiate: (di) => {
    const logStore = di.inject(logStoreInjectable);

    return (tabId: TabId) => logStore.areLogsPresent(tabId);
  },
});

export default areLogsPresentInjectable;
