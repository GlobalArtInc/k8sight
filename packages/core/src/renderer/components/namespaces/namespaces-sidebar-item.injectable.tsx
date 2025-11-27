import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import namespacesRouteInjectable from "../../../common/front-end-routing/routes/cluster/namespaces/namespaces-route.injectable";
import navigateToNamespacesInjectable from "../../../common/front-end-routing/routes/cluster/namespaces/navigate-to-namespaces.injectable";
import routeIsActiveInjectable from "../../routes/route-is-active.injectable";

const namespacesSidebarItemInjectable = getInjectable({
  id: "sidebar-item-namespaces",

  instantiate: (di) => {
    const route = di.inject(namespacesRouteInjectable);

    return {
      parentId: null,
      getIcon: () => <Icon material="layers" />,
      title: "Namespaces",
      onClick: di.inject(navigateToNamespacesInjectable),
      isActive: di.inject(routeIsActiveInjectable, route),
      isVisible: route.isEnabled,
      orderNumber: 70,
    };
  },

  injectionToken: sidebarItemInjectionToken,
});

export default namespacesSidebarItemInjectable;
