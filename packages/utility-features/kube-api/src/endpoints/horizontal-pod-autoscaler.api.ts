import { HorizontalPodAutoscaler } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class HorizontalPodAutoscalerApi extends KubeApi<HorizontalPodAutoscaler> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      allowedUsableVersions: {
        autoscaling: ["v2", "v2beta2", "v2beta1", "v1"],
      },
      ...(opts ?? {}),
      objectConstructor: HorizontalPodAutoscaler,
      checkPreferredVersion: true,
    });
  }
}
