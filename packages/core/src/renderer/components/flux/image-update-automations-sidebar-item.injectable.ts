import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxImageAutomationSidebarItemInjectable from "./image-automation-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-image-update-automations",
  parentId: fluxImageAutomationSidebarItemInjectable.id,
  title: "Image Update Automations",
  group: "image.toolkit.fluxcd.io",
  name: "imageupdateautomations",
  orderNumber: 30,
});
