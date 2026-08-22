import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxSourcesSidebarItemInjectable from "./sources-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-buckets",
  parentId: fluxSourcesSidebarItemInjectable.id,
  title: "Buckets",
  group: "source.toolkit.fluxcd.io",
  name: "buckets",
  orderNumber: 40,
});
