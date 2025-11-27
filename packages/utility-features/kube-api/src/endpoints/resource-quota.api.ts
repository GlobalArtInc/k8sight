import { ResourceQuota } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ResourceQuotaApi extends KubeApi<ResourceQuota> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: ResourceQuota,
      ...opts,
    });
  }
}
