import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import fluxSidebarItemInjectable from "./flux-sidebar-item.injectable";

const fluxNotificationsSidebarItemInjectable = getInjectable({
  id: "sidebar-item-flux-notifications",

  instantiate: () => ({
    parentId: fluxSidebarItemInjectable.id,
    title: "Notifications",
    onClick: noop,
    orderNumber: 50,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default fluxNotificationsSidebarItemInjectable;
