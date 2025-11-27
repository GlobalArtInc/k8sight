import { ConfigMap } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { ConfigMapData } from "@kubesightapp/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ConfigMapApi extends KubeApi<ConfigMap, ConfigMapData> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      objectConstructor: ConfigMap,
      ...(opts ?? {}),
    });
  }
}
