import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxSourcesSidebarItemInjectable from "./sources-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-oci-repositories",
  parentId: fluxSourcesSidebarItemInjectable.id,
  title: "OCI Repositories",
  group: "source.toolkit.fluxcd.io",
  name: "ocirepositories",
  orderNumber: 30,
});
