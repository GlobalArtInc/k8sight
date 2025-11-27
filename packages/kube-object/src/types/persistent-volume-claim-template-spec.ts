import type { KubeObjectScope, KubeTemplateObjectMetadata } from "../api-types";
import type { PersistentVolumeSpec } from "../specifics/persistent-volume";

export interface PersistentVolumeClaimTemplateSpec {
  metadata?: KubeTemplateObjectMetadata<KubeObjectScope.Cluster>;
  spec?: PersistentVolumeSpec;
}
