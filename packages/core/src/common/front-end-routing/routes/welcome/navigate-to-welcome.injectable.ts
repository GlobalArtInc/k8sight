import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../navigate-to-route-injection-token";
import welcomeRouteInjectable from "./welcome-route.injectable";

const navigateToWelcomeInjectable = getInjectable({
  id: "navigate-to-welcome",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(welcomeRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToWelcomeInjectable;
