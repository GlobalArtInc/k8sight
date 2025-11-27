import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import podDisruptionBudgetsRouteInjectable from "./pod-disruption-budgets-route.injectable";

const navigateToPodDisruptionBudgetsInjectable = getInjectable({
  id: "navigate-to-pod-disruption-budgets",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(podDisruptionBudgetsRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToPodDisruptionBudgetsInjectable;
