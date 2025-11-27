import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import statefulsetsRouteInjectable from "./statefulsets-route.injectable";

const navigateToStatefulsetsInjectable = getInjectable({
  id: "navigate-to-statefulsets",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(statefulsetsRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToStatefulsetsInjectable;
