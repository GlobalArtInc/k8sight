import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import persistentVolumeClaimsRouteInjectable from "./persistent-volume-claims-route.injectable";

const navigateToPersistentVolumeClaimsInjectable = getInjectable({
  id: "navigate-to-persistent-volume-claims",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(persistentVolumeClaimsRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToPersistentVolumeClaimsInjectable;
