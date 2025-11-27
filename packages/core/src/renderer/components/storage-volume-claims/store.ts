import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { PersistentVolumeClaimApi } from "@kubesightapp/kube-api";
import type { PersistentVolumeClaim } from "@kubesightapp/kube-object";

export class PersistentVolumeClaimStore extends KubeObjectStore<PersistentVolumeClaim, PersistentVolumeClaimApi> {}
