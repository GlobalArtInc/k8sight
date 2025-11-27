import { PodDisruptionBudget } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class PodDisruptionBudgetApi extends KubeApi<PodDisruptionBudget> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: PodDisruptionBudget,
      ...opts,
    });
  }
}
