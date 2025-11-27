import type { EnvVarKeySelector } from "./env-var-key-selector";
import type { ObjectFieldSelector } from "./object-field-selector";
import type { ResourceFieldSelector } from "./resource-field-selector";

export interface EnvVarSource {
  configMapKeyRef?: EnvVarKeySelector;
  fieldRef?: ObjectFieldSelector;
  resourceFieldRef?: ResourceFieldSelector;
  secretKeyRef?: EnvVarKeySelector;
}
