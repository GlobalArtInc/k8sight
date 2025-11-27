import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";

const getRandomInstallChartTabIdInjectable = getInjectable({
  id: "get-random-install-chart-tab-id",
  instantiate: (di) => di.inject(getRandomIdInjectionToken),
});

export default getRandomInstallChartTabIdInjectable;
