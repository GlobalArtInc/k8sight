import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import clusterRolesRouteInjectable from "./cluster-roles-route.injectable";

const navigateToClusterRolesInjectable = getInjectable({
  id: "navigate-to-cluster-roles",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(clusterRolesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToClusterRolesInjectable;
