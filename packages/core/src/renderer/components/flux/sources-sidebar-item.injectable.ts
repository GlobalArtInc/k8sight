import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import fluxSidebarItemInjectable from "./flux-sidebar-item.injectable";

const fluxSourcesSidebarItemInjectable = getInjectable({
  id: "sidebar-item-flux-sources",

  instantiate: () => ({
    parentId: fluxSidebarItemInjectable.id,
    title: "Sources",
    onClick: noop,
    orderNumber: 60,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default fluxSourcesSidebarItemInjectable;
