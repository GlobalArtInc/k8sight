import { ClusterRoleBinding } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { ClusterRoleBindingData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ClusterRoleBindingApi extends KubeApi<ClusterRoleBinding, ClusterRoleBindingData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: ClusterRoleBinding,
    });
  }
}
