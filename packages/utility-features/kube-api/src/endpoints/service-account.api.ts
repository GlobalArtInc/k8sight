import { ServiceAccount } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { ServiceAccountData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ServiceAccountApi extends KubeApi<ServiceAccount, ServiceAccountData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: ServiceAccount,
    });
  }
}
