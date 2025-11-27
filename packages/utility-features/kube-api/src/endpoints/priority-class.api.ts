import { PriorityClass } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { PriorityClassData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class PriorityClassApi extends KubeApi<PriorityClass, PriorityClassData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: PriorityClass,
      ...opts,
    });
  }
}
