import { getFluxResourceSidebarItemInjectable } from "./flux-resource-sidebar-item";

export default getFluxResourceSidebarItemInjectable({
  id: "sidebar-item-flux-helm-releases",
  title: "Helm Releases",
  group: "helm.toolkit.fluxcd.io",
  name: "helmreleases",
  orderNumber: 20,
});
