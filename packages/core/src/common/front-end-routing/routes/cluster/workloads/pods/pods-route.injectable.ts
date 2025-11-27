import { getInjectable } from "@ogre-tools/injectable";
import { shouldShowResourceInjectionToken } from "../../../../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import { frontEndRouteInjectionToken } from "../../../../front-end-route-injection-token";

const podsRouteInjectable = getInjectable({
  id: "pods-route",

  instantiate: (di) => ({
    path: "/pods",
    clusterFrame: true,
    isEnabled: di.inject(shouldShowResourceInjectionToken, {
      apiName: "pods",
      group: "",
    }),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default podsRouteInjectable;
