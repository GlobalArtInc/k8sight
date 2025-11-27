export interface Condition {
  lastTransitionTime?: string;
  message?: string;
  observedGeneration?: number;
  reason?: string;
  status: string;
  type: string;
}
