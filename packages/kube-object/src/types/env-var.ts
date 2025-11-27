import type { EnvVarSource } from "./env-var-source";

export interface EnvVar {
  name: string;
  value?: string;
  valueFrom?: EnvVarSource;
}
