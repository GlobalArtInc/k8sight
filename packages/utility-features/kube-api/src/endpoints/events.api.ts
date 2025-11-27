import { KubeEvent } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { KubeEventData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class KubeEventApi extends KubeApi<KubeEvent, KubeEventData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: KubeEvent,
      ...opts,
    });
  }
}
