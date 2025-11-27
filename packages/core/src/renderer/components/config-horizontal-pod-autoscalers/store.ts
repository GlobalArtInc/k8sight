import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { HorizontalPodAutoscalerApi } from "@kubesightapp/kube-api";
import type { HorizontalPodAutoscaler } from "@kubesightapp/kube-object";

export class HorizontalPodAutoscalerStore extends KubeObjectStore<
  HorizontalPodAutoscaler,
  HorizontalPodAutoscalerApi
> {}
