export interface VolumeMount {
  name: string;
  readOnly?: boolean;
  mountPath: string;
  mountPropagation?: string;
  subPath?: string;
  subPathExpr?: string;
}
