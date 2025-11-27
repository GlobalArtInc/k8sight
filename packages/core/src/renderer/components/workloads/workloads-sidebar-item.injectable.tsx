import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

const workloadsSidebarItemInjectable = getInjectable({
  id: "sidebar-item-workloads",

  instantiate: () => ({
    parentId: null,
    title: "Workloads",
    getIcon: () => <Icon svg="workloads" />,
    onClick: noop,
    orderNumber: 20,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default workloadsSidebarItemInjectable;
