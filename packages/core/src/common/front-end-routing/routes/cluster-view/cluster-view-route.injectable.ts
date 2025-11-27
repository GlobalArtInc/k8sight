import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../front-end-route-injection-token";

const clusterViewRouteInjectable = getInjectable({
  id: "cluster-view-route",

  instantiate: () => ({
    path: "/cluster/:clusterId",
    clusterFrame: false,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default clusterViewRouteInjectable;
