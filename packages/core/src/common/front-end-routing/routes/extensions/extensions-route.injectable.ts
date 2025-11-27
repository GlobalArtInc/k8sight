import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../front-end-route-injection-token";

const extensionsRouteInjectable = getInjectable({
  id: "extensions-route",

  instantiate: () => ({
    path: "/extensions",
    clusterFrame: false,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default extensionsRouteInjectable;
