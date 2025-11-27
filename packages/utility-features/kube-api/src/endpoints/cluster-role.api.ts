import { ClusterRole } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { ClusterRoleData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ClusterRoleApi extends KubeApi<ClusterRole, ClusterRoleData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: ClusterRole,
    });
  }
}
