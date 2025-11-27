import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import replicationControllersRouteInjectable from "./route.injectable";

const navigateToReplicationControllersInjectable = getInjectable({
  id: "navigate-to-replicationcontrollers",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(replicationControllersRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToReplicationControllersInjectable;
