import { getInjectable } from "@ogre-tools/injectable";
import { TabKind } from "../dock/store";
import dockStoreInjectable from "../dock/store.injectable";

import type { DockTabCreateSpecific } from "../dock/store";

const createResourceTabInjectable = getInjectable({
  id: "create-resource-tab",

  instantiate: (di) => {
    const dockStore = di.inject(dockStoreInjectable);

    return (tabParams: DockTabCreateSpecific = {}) =>
      dockStore.createTab({
        title: "Create resource",
        ...tabParams,
        kind: TabKind.CREATE_RESOURCE,
      });
  },
});

export default createResourceTabInjectable;
