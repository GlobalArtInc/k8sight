import { MutatingWebhookConfiguration } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class MutatingWebhookConfigurationApi extends KubeApi<MutatingWebhookConfiguration> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: MutatingWebhookConfiguration,
    });
  }
}
