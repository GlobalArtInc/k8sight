import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { ReplicationControllerApi } from "@kubesightapp/kube-api";
import type { ReplicationController } from "@kubesightapp/kube-object";

export class ReplicationControllerStore extends KubeObjectStore<ReplicationController, ReplicationControllerApi> {}
