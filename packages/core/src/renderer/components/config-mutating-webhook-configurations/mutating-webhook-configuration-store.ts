import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { MutatingWebhookConfigurationApi } from "@kubesightapp/kube-api";
import type { MutatingWebhookConfiguration } from "@kubesightapp/kube-object";

export class MutatingWebhookConfigurationStore extends KubeObjectStore<
  MutatingWebhookConfiguration,
  MutatingWebhookConfigurationApi
> {}
