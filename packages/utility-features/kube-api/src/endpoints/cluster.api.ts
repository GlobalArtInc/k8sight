import { Cluster } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ClusterApi extends KubeApi<Cluster> {
  /**
   * @deprecated This field is legacy and never used.
   */
  static kind = "Cluster";

  /**
   * @deprecated This field is legacy and never used.
   */
  static namespaced = true;

  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: Cluster,
    });
  }
}
