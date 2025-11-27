import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import ingressClassesRouteInjectable from "./ingress-classes-route.injectable";

const navigateToIngressesInjectable = getInjectable({
  id: "navigate-to-ingress-classes",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(ingressClassesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToIngressesInjectable;
