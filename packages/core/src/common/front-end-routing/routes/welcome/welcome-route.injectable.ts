import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../front-end-route-injection-token";
import welcomeRouteConfigInjectable from "./welcome-route-config.injectable";

const welcomeRouteInjectable = getInjectable({
  id: "welcome-route",

  instantiate: (di) => {
    const welcomeRoute = di.inject(welcomeRouteConfigInjectable);

    return {
      path: welcomeRoute,
      clusterFrame: false,
      isEnabled: computed(() => true),
    };
  },

  injectionToken: frontEndRouteInjectionToken,
});

export default welcomeRouteInjectable;
