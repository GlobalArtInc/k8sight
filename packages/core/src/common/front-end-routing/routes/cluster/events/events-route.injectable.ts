import { getInjectable } from "@ogre-tools/injectable";
import { shouldShowResourceInjectionToken } from "../../../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import { frontEndRouteInjectionToken } from "../../../front-end-route-injection-token";

const eventsRouteInjectable = getInjectable({
  id: "events-route",

  instantiate: (di) => ({
    path: "/events",
    clusterFrame: true,
    isEnabled: di.inject(shouldShowResourceInjectionToken, {
      apiName: "events",
      group: "",
    }),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default eventsRouteInjectable;
