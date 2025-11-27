import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

const configSidebarItemInjectable = getInjectable({
  id: "sidebar-item-config",

  instantiate: () => ({
    parentId: null,
    title: "Config",
    getIcon: () => <Icon material="list" />,
    onClick: noop,
    orderNumber: 40,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default configSidebarItemInjectable;
