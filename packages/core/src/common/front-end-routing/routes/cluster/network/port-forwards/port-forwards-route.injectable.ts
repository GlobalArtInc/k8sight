import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../../../front-end-route-injection-token";

import type { Route } from "../../../../front-end-route-injection-token";

export interface PortForwardsPathParameters {
  forwardport?: string;
}

const portForwardsRouteInjectable = getInjectable({
  id: "port-forwards-route",

  instantiate: (): Route<PortForwardsPathParameters> => ({
    path: "/port-forwards/:forwardport?",
    clusterFrame: true,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default portForwardsRouteInjectable;
