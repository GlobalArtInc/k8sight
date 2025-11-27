import { Job } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies, NamespacedResourceDescriptor } from "../kube-api";

export class JobApi extends KubeApi<Job> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: Job,
    });
  }

  private requestSetSuspend(params: NamespacedResourceDescriptor, suspend: boolean) {
    return this.patch(
      params,
      {
        spec: {
          suspend,
        },
      },
      "strategic",
    );
  }

  suspend(params: NamespacedResourceDescriptor) {
    return this.requestSetSuspend(params, true);
  }

  resume(params: NamespacedResourceDescriptor) {
    return this.requestSetSuspend(params, false);
  }
}
