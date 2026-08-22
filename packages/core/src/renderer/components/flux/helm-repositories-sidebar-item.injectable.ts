import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxSourcesSidebarItemInjectable from "./sources-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-helm-repositories",
  parentId: fluxSourcesSidebarItemInjectable.id,
  title: "Helm Repositories",
  group: "source.toolkit.fluxcd.io",
  name: "helmrepositories",
  orderNumber: 20,
});
