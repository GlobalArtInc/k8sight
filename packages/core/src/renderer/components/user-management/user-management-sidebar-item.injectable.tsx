import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

const userManagementSidebarItemInjectable = getInjectable({
  id: "sidebar-item-user-management",

  instantiate: () => ({
    parentId: null,
    getIcon: () => <Icon material="security" />,
    title: "Access Control",
    onClick: noop,
    orderNumber: 100,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default userManagementSidebarItemInjectable;
