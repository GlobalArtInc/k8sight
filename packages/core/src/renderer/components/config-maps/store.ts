import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { ConfigMapApi } from "@kubesightapp/kube-api";
import type { ConfigMap, ConfigMapData } from "@kubesightapp/kube-object";

export class ConfigMapStore extends KubeObjectStore<ConfigMap, ConfigMapApi, ConfigMapData> {}
