import type { KubeObjectScope, KubeTemplateObjectMetadata } from "../api-types";
import type { JobSpec } from "../specifics/job";

export interface JobTemplateSpec {
  metadata?: KubeTemplateObjectMetadata<KubeObjectScope.Namespace>;
  spec?: JobSpec;
}
