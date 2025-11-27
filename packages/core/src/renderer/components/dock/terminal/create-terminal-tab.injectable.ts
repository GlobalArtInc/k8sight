import { getInjectable } from "@ogre-tools/injectable";
import { TabKind } from "../dock/store";
import dockStoreInjectable from "../dock/store.injectable";

import type { DockTabCreateSpecific } from "../dock/store";

const createTerminalTabInjectable = getInjectable({
  id: "create-terminal-tab",

  instantiate: (di) => {
    const dockStore = di.inject(dockStoreInjectable);

    return (tabParams: DockTabCreateSpecific = {}) =>
      dockStore.createTab({
        title: `Terminal`,
        ...tabParams,
        kind: TabKind.TERMINAL,
      });
  },
});

export default createTerminalTabInjectable;
