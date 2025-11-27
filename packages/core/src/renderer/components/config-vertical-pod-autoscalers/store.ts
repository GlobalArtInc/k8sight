import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { VerticalPodAutoscalerApi } from "@kubesightapp/kube-api";
import type { VerticalPodAutoscaler } from "@kubesightapp/kube-object";

export class VerticalPodAutoscalerStore extends KubeObjectStore<VerticalPodAutoscaler, VerticalPodAutoscalerApi> {}
