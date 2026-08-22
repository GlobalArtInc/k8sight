import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import fluxDashboardRouteInjectable from "../../../common/front-end-routing/routes/cluster/flux/flux-dashboard-route.injectable";
import navigateToFluxDashboardInjectable from "../../../common/front-end-routing/routes/cluster/flux/navigate-to-flux-dashboard.injectable";
import routeIsActiveInjectable from "../../routes/route-is-active.injectable";
import fluxSidebarItemInjectable from "./flux-sidebar-item.injectable";

const fluxDashboardSidebarItemInjectable = getInjectable({
  id: "sidebar-item-flux-dashboard",

  instantiate: (di) => {
    const route = di.inject(fluxDashboardRouteInjectable);

    return {
      parentId: fluxSidebarItemInjectable.id,
      title: "Dashboard",
      onClick: di.inject(navigateToFluxDashboardInjectable),
      isActive: di.inject(routeIsActiveInjectable, route),
      isVisible: route.isEnabled,
      orderNumber: 10,
    };
  },

  injectionToken: sidebarItemInjectionToken,
});

export default fluxDashboardSidebarItemInjectable;
