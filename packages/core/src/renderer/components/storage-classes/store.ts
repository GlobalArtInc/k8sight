import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { StorageClassApi } from "@kubesightapp/kube-api";
import type { StorageClass, StorageClassData } from "@kubesightapp/kube-object";

import type { KubeObjectStoreDependencies, KubeObjectStoreOptions } from "../../../common/k8s-api/kube-object.store";
import type { GetPersistentVolumesByStorageClass } from "../storage-volumes/get-persistent-volumes-by-storage-class.injectable";

export interface StorageClassStoreDependencies extends KubeObjectStoreDependencies {
  getPersistentVolumesByStorageClass: GetPersistentVolumesByStorageClass;
}

export class StorageClassStore extends KubeObjectStore<StorageClass, StorageClassApi, StorageClassData> {
  constructor(
    protected readonly dependencies: StorageClassStoreDependencies,
    api: StorageClassApi,
    opts?: KubeObjectStoreOptions,
  ) {
    super(dependencies, api, opts);
  }

  getPersistentVolumes(storageClass: StorageClass) {
    return this.dependencies.getPersistentVolumesByStorageClass(storageClass);
  }
}
