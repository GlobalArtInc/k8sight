import { CustomResourceDefinition } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class CustomResourceDefinitionApi extends KubeApi<CustomResourceDefinition> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: CustomResourceDefinition,
      checkPreferredVersion: true,
      ...opts,
    });
  }
}
