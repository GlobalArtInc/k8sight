import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { EndpointSliceApi } from "@kubesightapp/kube-api";
import type { EndpointSlice, EndpointSliceData } from "@kubesightapp/kube-object";

export class EndpointSliceStore extends KubeObjectStore<EndpointSlice, EndpointSliceApi, EndpointSliceData> {}
