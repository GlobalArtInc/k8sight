import { StorageClass } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { StorageClassData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class StorageClassApi extends KubeApi<StorageClass, StorageClassData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: StorageClass,
    });
  }
}
