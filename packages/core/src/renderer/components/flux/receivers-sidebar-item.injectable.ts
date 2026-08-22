import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxNotificationsSidebarItemInjectable from "./notifications-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-receivers",
  parentId: fluxNotificationsSidebarItemInjectable.id,
  title: "Receivers",
  group: "notification.toolkit.fluxcd.io",
  name: "receivers",
  orderNumber: 30,
});
