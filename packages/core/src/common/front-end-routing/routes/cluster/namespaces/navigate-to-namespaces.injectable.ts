import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../navigate-to-route-injection-token";
import namespacesRouteInjectable from "./namespaces-route.injectable";

const navigateToNamespacesInjectable = getInjectable({
  id: "navigate-to-namespaces",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(namespacesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToNamespacesInjectable;
