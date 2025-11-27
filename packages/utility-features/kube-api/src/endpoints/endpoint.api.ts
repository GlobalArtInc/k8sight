import { Endpoints } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { EndpointsData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class EndpointsApi extends KubeApi<Endpoints, EndpointsData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: Endpoints,
      ...opts,
    });
  }
}
