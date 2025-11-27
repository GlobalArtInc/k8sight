import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { IngressClassApi } from "@kubesightapp/kube-api";
import type { IngressClass } from "@kubesightapp/kube-object";

export class IngressClassStore extends KubeObjectStore<IngressClass, IngressClassApi> {}
