import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { PodDisruptionBudgetApi } from "@kubesightapp/kube-api";
import type { PodDisruptionBudget } from "@kubesightapp/kube-object";

export class PodDisruptionBudgetStore extends KubeObjectStore<PodDisruptionBudget, PodDisruptionBudgetApi> {}
