import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxImageAutomationSidebarItemInjectable from "./image-automation-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-image-policies",
  parentId: fluxImageAutomationSidebarItemInjectable.id,
  title: "Image Policies",
  group: "image.toolkit.fluxcd.io",
  name: "imagepolicies",
  orderNumber: 20,
});
