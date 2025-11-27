import { NodeMetrics } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { NodeMetricsData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class NodeMetricsApi extends KubeApi<NodeMetrics, NodeMetricsData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: NodeMetrics,
    });
  }
}
