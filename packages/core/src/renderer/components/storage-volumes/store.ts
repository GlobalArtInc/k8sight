import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { PersistentVolumeApi } from "@kubesightapp/kube-api";
import type { PersistentVolume, StorageClass } from "@kubesightapp/kube-object";

export class PersistentVolumeStore extends KubeObjectStore<PersistentVolume, PersistentVolumeApi> {
  getByStorageClass(storageClass: StorageClass): PersistentVolume[] {
    const storageClassName = storageClass.getName();

    return this.items.filter((volume) => volume.getStorageClassName() === storageClassName);
  }
}
