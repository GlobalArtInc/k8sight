import { asLegacyGlobalForExtensionApi } from "@kubesightapp/legacy-global-di";
import kubernetesClusterCategoryInjectable from "../../common/catalog/categories/kubernetes-cluster.injectable";

import type { KubernetesClusterCategory } from "../../common/catalog-entities/kubernetes-cluster";

export {
  GeneralEntity,
  KubernetesCluster,
  WebLink,
} from "../../common/catalog-entities";

export type { KubernetesClusterCategory };

export const kubernetesClusterCategory = asLegacyGlobalForExtensionApi(kubernetesClusterCategoryInjectable);

export * from "../../common/catalog/catalog-entity";

export type {
  GeneralEntitySpec,
  KubernetesClusterMetadata,
  KubernetesClusterPrometheusMetrics,
  KubernetesClusterSpec,
  KubernetesClusterStatus,
  KubernetesClusterStatusPhase,
  WebLinkSpec,
  WebLinkStatus,
  WebLinkStatusPhase,
} from "../../common/catalog-entities";
