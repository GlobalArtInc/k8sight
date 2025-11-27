import { Secret } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { SecretData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class SecretApi extends KubeApi<Secret, SecretData> {
  constructor(deps: KubeApiDependencies, options: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...options,
      objectConstructor: Secret,
    });
  }
}
