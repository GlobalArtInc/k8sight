import { ComponentStatus } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ComponentStatusApi extends KubeApi<ComponentStatus> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: ComponentStatus,
    });
  }
}
