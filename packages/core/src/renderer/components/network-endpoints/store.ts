import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { EndpointsApi } from "@kubesightapp/kube-api";
import type { Endpoints, EndpointsData } from "@kubesightapp/kube-object";

export class EndpointsStore extends KubeObjectStore<Endpoints, EndpointsApi, EndpointsData> {}
