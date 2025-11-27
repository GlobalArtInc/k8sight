import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { IngressApi } from "@kubesightapp/kube-api";
import type { Ingress } from "@kubesightapp/kube-object";

export class IngressStore extends KubeObjectStore<Ingress, IngressApi> {}
