import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import servicesRouteInjectable from "./services-route.injectable";

const navigateToServicesInjectable = getInjectable({
  id: "navigate-to-services",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(servicesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToServicesInjectable;
