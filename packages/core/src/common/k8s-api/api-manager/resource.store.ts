import { KubeObjectStore } from "../kube-object.store";

import type { KubeApi } from "@kubesightapp/kube-api";
import type { KubeObject } from "@kubesightapp/kube-object";

import type { KubeObjectStoreDependencies } from "../kube-object.store";

export class CustomResourceStore<K extends KubeObject> extends KubeObjectStore<K, KubeApi<K>> {
  constructor(deps: KubeObjectStoreDependencies, api: KubeApi<K>) {
    super(deps, api);
  }
}
