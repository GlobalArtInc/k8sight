import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import endpointSlicesRouteInjectable from "./endpoint-slices-route.injectable";

const navigateToEndpointSlicesInjectable = getInjectable({
  id: "navigate-to-endpoint-slices",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(endpointSlicesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToEndpointSlicesInjectable;
