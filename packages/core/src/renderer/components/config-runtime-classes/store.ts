import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { RuntimeClassApi } from "@kubesightapp/kube-api";
import type { RuntimeClass } from "@kubesightapp/kube-object";

export class RuntimeClassStore extends KubeObjectStore<RuntimeClass, RuntimeClassApi> {}
