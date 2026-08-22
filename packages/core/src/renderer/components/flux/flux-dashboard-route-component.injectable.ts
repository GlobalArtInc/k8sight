import { getInjectable } from "@ogre-tools/injectable";
import fluxDashboardRouteInjectable from "../../../common/front-end-routing/routes/cluster/flux/flux-dashboard-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { FluxDashboard } from "./flux-dashboard";

const fluxDashboardRouteComponentInjectable = getInjectable({
  id: "flux-dashboard-route-component",

  instantiate: (di) => ({
    route: di.inject(fluxDashboardRouteInjectable),
    Component: FluxDashboard,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default fluxDashboardRouteComponentInjectable;
