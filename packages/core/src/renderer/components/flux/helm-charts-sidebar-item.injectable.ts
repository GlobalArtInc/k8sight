import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";
import fluxSourcesSidebarItemInjectable from "./sources-sidebar-item.injectable";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-helm-charts",
  parentId: fluxSourcesSidebarItemInjectable.id,
  title: "Helm Charts",
  group: "source.toolkit.fluxcd.io",
  name: "helmcharts",
  orderNumber: 50,
});
