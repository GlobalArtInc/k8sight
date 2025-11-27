import type { LocalObjectReference } from "../api-types";

export interface EnvSource extends LocalObjectReference {
  /**
   * Whether the object must be defined
   */
  optional?: boolean;
}
