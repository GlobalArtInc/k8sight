import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxImageAutomationSidebarItemInjectable from "./image-automation-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-image-repositories",
  parentId: fluxImageAutomationSidebarItemInjectable.id,
  title: "Image Repositories",
  group: "image.toolkit.fluxcd.io",
  name: "imagerepositories",
  orderNumber: 10,
});
