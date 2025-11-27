import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

const helmSidebarItemInjectable = getInjectable({
  id: "sidebar-item-helm",

  instantiate: () => ({
    parentId: null,
    getIcon: () => <Icon svg="helm" />,
    title: "Helm",
    onClick: noop,
    orderNumber: 90,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default helmSidebarItemInjectable;
