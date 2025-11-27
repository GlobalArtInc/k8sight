import { KubeObjectStore } from "../../../../common/k8s-api/kube-object.store";

import type { ServiceAccountApi } from "@kubesightapp/kube-api";
import type { ServiceAccount, ServiceAccountData } from "@kubesightapp/kube-object";

export class ServiceAccountStore extends KubeObjectStore<ServiceAccount, ServiceAccountApi, ServiceAccountData> {
  protected async createItem(params: { name: string; namespace?: string }) {
    await super.createItem(params);

    return this.api.get(params); // hackfix: load freshly created account, cause it doesn't have "secrets" field yet
  }
}
