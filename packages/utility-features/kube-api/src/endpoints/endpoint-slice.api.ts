import { EndpointSlice } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { EndpointSliceData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class EndpointSliceApi extends KubeApi<EndpointSlice, EndpointSliceData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: EndpointSlice,
      ...opts,
    });
  }
}
