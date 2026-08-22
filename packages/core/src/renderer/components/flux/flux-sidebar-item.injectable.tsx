import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import React from "react";

/**
 * The Flux section of the navigator.
 *
 * It has no page of its own; like Workloads it is a heading, and it disappears entirely on
 * clusters without Flux because each of its children is only visible when the cluster actually
 * serves that Flux resource.
 */
const fluxSidebarItemInjectable = getInjectable({
  id: "sidebar-item-flux",

  instantiate: () => ({
    parentId: null,
    title: "Flux",
    getIcon: () => <Icon material="sync" />,
    onClick: noop,
    // Between Workloads (20) and Config (40): what Flux reconciles is workloads.
    orderNumber: 30,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default fluxSidebarItemInjectable;
