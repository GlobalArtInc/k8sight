import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { ClusterApi } from "@kubesightapp/kube-api";
import type { Cluster } from "@kubesightapp/kube-object";

export class ClusterStore extends KubeObjectStore<Cluster, ClusterApi> {}
