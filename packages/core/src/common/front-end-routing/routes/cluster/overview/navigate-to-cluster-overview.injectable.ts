import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../navigate-to-route-injection-token";
import clusterOverviewRouteInjectable from "./cluster-overview-route.injectable";

const navigateToClusterOverviewInjectable = getInjectable({
  id: "navigate-to-cluster-overview",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(clusterOverviewRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToClusterOverviewInjectable;
