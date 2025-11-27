import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { noop } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";

const customResourcesSidebarItemInjectable = getInjectable({
  id: "sidebar-item-custom-resources",
  instantiate: () => ({
    parentId: null,
    title: "Custom Resources",
    getIcon: () => <Icon material="extension" />,
    onClick: noop,
    orderNumber: 110,
  }),
  injectionToken: sidebarItemInjectionToken,
});

export default customResourcesSidebarItemInjectable;
