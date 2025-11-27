import { getInjectable } from "@ogre-tools/injectable";
import installChartTabStoreInjectable from "./store.injectable";

import type { TabId } from "../dock/store";

const clearInstallChartTabDataInjectable = getInjectable({
  id: "clear-install-chart-tab-data",

  instantiate: (di) => {
    const installChartTabStore = di.inject(installChartTabStoreInjectable);

    return (tabId: TabId) => {
      installChartTabStore.clearData(tabId);
    };
  },
});

export default clearInstallChartTabDataInjectable;
