import { getInjectable } from "@ogre-tools/injectable";
import podDisruptionBudgetsRouteInjectable from "../../../common/front-end-routing/routes/cluster/config/pod-disruption-budgets/pod-disruption-budgets-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { PodDisruptionBudgets } from "./pod-disruption-budgets";

const podDisruptionBudgetsRouteComponentInjectable = getInjectable({
  id: "pod-disruption-budgets-route-component",

  instantiate: (di) => ({
    route: di.inject(podDisruptionBudgetsRouteInjectable),
    Component: PodDisruptionBudgets,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default podDisruptionBudgetsRouteComponentInjectable;
