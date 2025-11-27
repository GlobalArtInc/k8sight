import { getInjectable } from "@ogre-tools/injectable";
import { shouldShowResourceInjectionToken } from "../../../../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import { frontEndRouteInjectionToken } from "../../../../front-end-route-injection-token";

const replicasetsRouteInjectable = getInjectable({
  id: "replicasets-route",

  instantiate: (di) => ({
    path: "/replicasets",
    clusterFrame: true,
    isEnabled: di.inject(shouldShowResourceInjectionToken, {
      apiName: "replicasets",
      group: "apps",
    }),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default replicasetsRouteInjectable;
