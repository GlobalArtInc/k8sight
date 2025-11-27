import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

const storageSidebarItemInjectable = getInjectable({
  id: "sidebar-item-storage",

  instantiate: () => ({
    parentId: null,
    getIcon: () => <Icon material="storage" />,
    title: "Storage",
    onClick: noop,
    orderNumber: 60,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default storageSidebarItemInjectable;
