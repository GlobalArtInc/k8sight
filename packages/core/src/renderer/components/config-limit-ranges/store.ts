import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { LimitRangeApi } from "@kubesightapp/kube-api";
import type { LimitRange } from "@kubesightapp/kube-object";

export class LimitRangeStore extends KubeObjectStore<LimitRange, LimitRangeApi> {}
