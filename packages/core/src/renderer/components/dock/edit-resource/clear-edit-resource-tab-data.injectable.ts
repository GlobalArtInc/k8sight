import { getInjectable } from "@ogre-tools/injectable";
import editResourceTabStoreInjectable from "./store.injectable";

import type { TabId } from "../dock/store";

const clearEditResourceTabDataInjectable = getInjectable({
  id: "clear-edit-resource-tab",

  instantiate: (di) => {
    const editResourceTabStore = di.inject(editResourceTabStoreInjectable);

    return (tabId: TabId) => {
      editResourceTabStore.clearData(tabId);
    };
  },
});

export default clearEditResourceTabDataInjectable;
