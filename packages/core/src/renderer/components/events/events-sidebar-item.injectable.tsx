import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import eventsRouteInjectable from "../../../common/front-end-routing/routes/cluster/events/events-route.injectable";
import navigateToEventsInjectable from "../../../common/front-end-routing/routes/cluster/events/navigate-to-events.injectable";
import routeIsActiveInjectable from "../../routes/route-is-active.injectable";

const eventsSidebarItemInjectable = getInjectable({
  id: "sidebar-item-events",

  instantiate: (di) => {
    const route = di.inject(eventsRouteInjectable);

    return {
      parentId: null,
      getIcon: () => <Icon material="access_time" />,
      title: "Events",
      onClick: di.inject(navigateToEventsInjectable),
      isActive: di.inject(routeIsActiveInjectable, route),
      isVisible: route.isEnabled,
      orderNumber: 80,
    };
  },

  injectionToken: sidebarItemInjectionToken,
});

export default eventsSidebarItemInjectable;
