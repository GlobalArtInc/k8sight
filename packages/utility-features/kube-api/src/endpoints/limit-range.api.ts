import { LimitRange } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class LimitRangeApi extends KubeApi<LimitRange> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      objectConstructor: LimitRange,
      ...(opts ?? {}),
    });
  }
}
