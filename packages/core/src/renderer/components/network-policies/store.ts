import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { NetworkPolicyApi } from "@kubesightapp/kube-api";
import type { NetworkPolicy } from "@kubesightapp/kube-object";

export class NetworkPolicyStore extends KubeObjectStore<NetworkPolicy, NetworkPolicyApi> {}
