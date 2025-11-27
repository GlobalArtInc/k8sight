import { waitUntilDefined } from "@kubesightapp/utilities";
import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import upgradeChartTabStoreInjectable from "./store.injectable";

const upgradeChartTabDataInjectable = getInjectable({
  id: "upgrade-chart-tab-data",
  instantiate: (di, tabId) => {
    const upgradeChartTabStore = di.inject(upgradeChartTabStoreInjectable);

    return waitUntilDefined(() => upgradeChartTabStore.getData(tabId));
  },
  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, tabId: string) => tabId,
  }),
});

export default upgradeChartTabDataInjectable;
