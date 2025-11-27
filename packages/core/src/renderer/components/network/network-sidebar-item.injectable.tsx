import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

const networkSidebarItemInjectable = getInjectable({
  id: "sidebar-item-network",

  instantiate: () => ({
    parentId: null,
    getIcon: () => <Icon material="device_hub" />,
    title: "Network",
    onClick: noop,
    orderNumber: 50,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default networkSidebarItemInjectable;
