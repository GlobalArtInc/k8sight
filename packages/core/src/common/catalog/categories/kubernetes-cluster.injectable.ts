import { getInjectable } from "@ogre-tools/injectable";
import { KubernetesClusterCategory } from "../../catalog-entities/kubernetes-cluster";
import { builtInCategoryInjectionToken } from "../category-registry.injectable";

const kubernetesClusterCategoryInjectable = getInjectable({
  id: "kubernetes-cluster-category",
  instantiate: () => new KubernetesClusterCategory(),
  injectionToken: builtInCategoryInjectionToken,
});

export default kubernetesClusterCategoryInjectable;
