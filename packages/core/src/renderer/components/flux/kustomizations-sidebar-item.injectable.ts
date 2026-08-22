import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-kustomizations",
  title: "Kustomizations",
  group: "kustomize.toolkit.fluxcd.io",
  name: "kustomizations",
  orderNumber: 30,
});
