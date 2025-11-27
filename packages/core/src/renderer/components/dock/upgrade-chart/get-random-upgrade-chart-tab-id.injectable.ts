import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";

const getRandomUpgradeChartTabIdInjectable = getInjectable({
  id: "get-random-upgrade-chart-tab-id",
  instantiate: (di) => di.inject(getRandomIdInjectionToken),
});

export default getRandomUpgradeChartTabIdInjectable;
