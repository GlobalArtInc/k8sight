import { Role } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { RoleData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class RoleApi extends KubeApi<Role, RoleData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: Role,
    });
  }
}
