import { PodMetrics } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { PodMetricsData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class PodMetricsApi extends KubeApi<PodMetrics, PodMetricsData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: PodMetrics,
    });
  }
}
