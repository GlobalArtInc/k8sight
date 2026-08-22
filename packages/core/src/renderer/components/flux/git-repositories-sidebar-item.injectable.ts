import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxSourcesSidebarItemInjectable from "./sources-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-git-repositories",
  parentId: fluxSourcesSidebarItemInjectable.id,
  title: "Git Repositories",
  group: "source.toolkit.fluxcd.io",
  name: "gitrepositories",
  orderNumber: 10,
});
