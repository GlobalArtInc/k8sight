import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../../../front-end-route-injection-token";

const workloadsOverviewRouteInjectable = getInjectable({
  id: "workloads-overview-route",

  instantiate: () => ({
    path: "/workloads",
    clusterFrame: true,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default workloadsOverviewRouteInjectable;
