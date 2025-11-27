import type { LabelSelector } from "../api-types";

export interface AggregationRule {
  clusterRoleSelectors?: LabelSelector;
}
