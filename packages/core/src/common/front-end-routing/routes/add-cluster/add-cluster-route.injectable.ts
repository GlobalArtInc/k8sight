import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../front-end-route-injection-token";

const addClusterRouteInjectable = getInjectable({
  id: "add-cluster-route",

  instantiate: () => ({
    path: "/add-cluster",
    clusterFrame: false,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default addClusterRouteInjectable;
