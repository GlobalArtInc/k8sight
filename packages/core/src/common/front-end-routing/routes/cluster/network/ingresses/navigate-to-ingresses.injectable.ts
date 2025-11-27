import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import ingressesRouteInjectable from "./ingresses-route.injectable";

const navigateToIngressesInjectable = getInjectable({
  id: "navigate-to-ingresses",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(ingressesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToIngressesInjectable;
