import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxNotificationsSidebarItemInjectable from "./notifications-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-providers",
  parentId: fluxNotificationsSidebarItemInjectable.id,
  title: "Providers",
  group: "notification.toolkit.fluxcd.io",
  name: "providers",
  orderNumber: 20,
});
