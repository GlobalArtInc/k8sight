import { getInjectable } from "@ogre-tools/injectable";
import { shouldShowResourceInjectionToken } from "../../../../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import { frontEndRouteInjectionToken } from "../../../../front-end-route-injection-token";

const secretsRouteInjectable = getInjectable({
  id: "secrets-route",

  instantiate: (di) => ({
    path: "/secrets",
    clusterFrame: true,
    isEnabled: di.inject(shouldShowResourceInjectionToken, {
      apiName: "secrets",
      group: "",
    }),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default secretsRouteInjectable;
