import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../navigate-to-route-injection-token";
import fluxDashboardRouteInjectable from "./flux-dashboard-route.injectable";

export type NavigateToFluxDashboard = () => void;

const navigateToFluxDashboardInjectable = getInjectable({
  id: "navigate-to-flux-dashboard",

  instantiate: (di): NavigateToFluxDashboard => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(fluxDashboardRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToFluxDashboardInjectable;
