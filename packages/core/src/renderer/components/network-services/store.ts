import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { ServiceApi } from "@kubesightapp/kube-api";
import type { Service } from "@kubesightapp/kube-object";

export class ServiceStore extends KubeObjectStore<Service, ServiceApi> {}
