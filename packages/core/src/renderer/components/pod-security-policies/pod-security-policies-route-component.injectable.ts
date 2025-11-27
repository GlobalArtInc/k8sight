import { getInjectable } from "@ogre-tools/injectable";
import podSecurityPoliciesRouteInjectable from "../../../common/front-end-routing/routes/cluster/user-management/pod-security-policies/pod-security-policies-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { PodSecurityPolicies } from "./pod-security-policies";

const podSecurityPoliciesRouteComponentInjectable = getInjectable({
  id: "pod-security-policies-route-component",

  instantiate: (di) => ({
    route: di.inject(podSecurityPoliciesRouteInjectable),
    Component: PodSecurityPolicies,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default podSecurityPoliciesRouteComponentInjectable;
