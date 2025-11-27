import { PersistentVolumeClaim } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class PersistentVolumeClaimApi extends KubeApi<PersistentVolumeClaim> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: PersistentVolumeClaim,
    });
  }
}
