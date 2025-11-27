import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import storageClassesRouteInjectable from "./storage-classes-route.injectable";

const navigateToStorageClassesInjectable = getInjectable({
  id: "navigate-to-storage-classes",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(storageClassesRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToStorageClassesInjectable;
