import { RoleBinding } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { RoleBindingData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class RoleBindingApi extends KubeApi<RoleBinding, RoleBindingData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: RoleBinding,
    });
  }
}
