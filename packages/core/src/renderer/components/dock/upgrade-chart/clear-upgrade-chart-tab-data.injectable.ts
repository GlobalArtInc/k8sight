import { getInjectable } from "@ogre-tools/injectable";
import upgradeChartTabStoreInjectable from "./store.injectable";

import type { TabId } from "../dock/store";

const clearUpgradeChartTabDataInjectable = getInjectable({
  id: "clear-upgrade-chart-tab-data",

  instantiate: (di) => {
    const upgradeChartTabStore = di.inject(upgradeChartTabStoreInjectable);

    return (tabId: TabId) => {
      upgradeChartTabStore.clearData(tabId);
    };
  },
});

export default clearUpgradeChartTabDataInjectable;
