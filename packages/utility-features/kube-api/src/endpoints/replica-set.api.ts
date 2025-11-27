import { ReplicaSet } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies, NamespacedResourceDescriptor } from "../kube-api";

export class ReplicaSetApi extends KubeApi<ReplicaSet> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: ReplicaSet,
    });
  }

  async getReplicas(params: NamespacedResourceDescriptor): Promise<number> {
    const { status } = await this.getResourceScale(params);

    return status.replicas;
  }

  scale(params: NamespacedResourceDescriptor, replicas: number) {
    return this.scaleResource(params, { spec: { replicas } });
  }
}
