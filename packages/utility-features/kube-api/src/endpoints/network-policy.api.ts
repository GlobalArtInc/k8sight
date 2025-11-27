import { NetworkPolicy } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class NetworkPolicyApi extends KubeApi<NetworkPolicy> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: NetworkPolicy,
      ...opts,
    });
  }
}
