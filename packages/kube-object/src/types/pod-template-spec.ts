import type { KubeObjectScope, KubeTemplateObjectMetadata } from "../api-types";
import type { PodSpec } from "../specifics/pod";

export interface PodTemplateSpec {
  metadata?: KubeTemplateObjectMetadata<KubeObjectScope.Namespace>;
  spec?: PodSpec;
}
