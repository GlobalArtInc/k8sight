import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { LeaseApi } from "@kubesightapp/kube-api";
import type { Lease } from "@kubesightapp/kube-object";

export class LeaseStore extends KubeObjectStore<Lease, LeaseApi> {}
