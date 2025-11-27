import { RuntimeClass } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { RuntimeClassData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class RuntimeClassApi extends KubeApi<RuntimeClass, RuntimeClassData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: RuntimeClass,
      ...opts,
    });
  }
}
