import { VerticalPodAutoscaler } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class VerticalPodAutoscalerApi extends KubeApi<VerticalPodAutoscaler> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: VerticalPodAutoscaler,
    });
  }
}
