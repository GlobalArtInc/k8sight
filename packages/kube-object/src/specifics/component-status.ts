import { KubeObject } from "../kube-object";

export interface ComponentStatusCondition {
  type: string;
  status: string;
  message: string;
}

export interface ComponentStatus {
  conditions: ComponentStatusCondition[];
}

export class ComponentStatus extends KubeObject {
  static kind = "ComponentStatus";

  static namespaced = false;

  static apiBase = "/api/v1/componentstatuses";

  getTruthyConditions() {
    return this.conditions.filter((c) => c.status === "True");
  }
}
