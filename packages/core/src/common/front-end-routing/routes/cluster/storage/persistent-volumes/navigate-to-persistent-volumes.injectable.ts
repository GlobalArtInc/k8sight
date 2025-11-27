import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import persistentVolumesRouteInjectable from "./persistent-volumes-route.injectable";

const navigateToPersistentVolumesInjectable = getInjectable({
  id: "navigate-to-persistent-volumes",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(persistentVolumesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToPersistentVolumesInjectable;
