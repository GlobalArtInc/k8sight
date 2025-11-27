import { getInjectable } from "@ogre-tools/injectable";
import createDockTabStoreInjectable from "../dock-tab-store/create-dock-tab-store.injectable";

export interface IChartUpgradeData {
  releaseName: string;
  releaseNamespace: string;
}

const upgradeChartTabStoreInjectable = getInjectable({
  id: "upgrade-chart-tab-store",

  instantiate: (di) => {
    const createDockTabStore = di.inject(createDockTabStoreInjectable);

    return createDockTabStore<IChartUpgradeData>({
      storageKey: "chart_releases",
    });
  },
});

export default upgradeChartTabStoreInjectable;
