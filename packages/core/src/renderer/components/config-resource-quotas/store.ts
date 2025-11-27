import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { ResourceQuotaApi } from "@kubesightapp/kube-api";
import type { ResourceQuota } from "@kubesightapp/kube-object";

export class ResourceQuotaStore extends KubeObjectStore<ResourceQuota, ResourceQuotaApi> {}
