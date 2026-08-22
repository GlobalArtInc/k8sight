import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxNotificationsSidebarItemInjectable from "./notifications-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-alerts",
  parentId: fluxNotificationsSidebarItemInjectable.id,
  title: "Alerts",
  group: "notification.toolkit.fluxcd.io",
  name: "alerts",
  orderNumber: 10,
});
