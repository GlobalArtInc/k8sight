import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { PodSecurityPolicyApi } from "@kubesightapp/kube-api";
import type { PodSecurityPolicy } from "@kubesightapp/kube-object";

export class PodSecurityPolicyStore extends KubeObjectStore<PodSecurityPolicy, PodSecurityPolicyApi> {}
