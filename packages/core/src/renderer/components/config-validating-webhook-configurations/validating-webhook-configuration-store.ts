import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { ValidatingWebhookConfigurationApi } from "@kubesightapp/kube-api";
import type { ValidatingWebhookConfiguration } from "@kubesightapp/kube-object";

export class ValidatingWebhookConfigurationStore extends KubeObjectStore<
  ValidatingWebhookConfiguration,
  ValidatingWebhookConfigurationApi
> {}
