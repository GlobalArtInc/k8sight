import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { PriorityClassApi } from "@kubesightapp/kube-api";
import type { PriorityClass } from "@kubesightapp/kube-object";

export class PriorityClassStore extends KubeObjectStore<PriorityClass, PriorityClassApi> {}
