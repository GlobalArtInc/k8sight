import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import podsRouteInjectable from "./pods-route.injectable";

const navigateToPodsInjectable = getInjectable({
  id: "navigate-to-pods",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(podsRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToPodsInjectable;
