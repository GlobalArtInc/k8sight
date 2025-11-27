import { PodSecurityPolicy } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class PodSecurityPolicyApi extends KubeApi<PodSecurityPolicy> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: PodSecurityPolicy,
    });
  }
}
