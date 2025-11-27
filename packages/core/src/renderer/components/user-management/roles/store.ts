import { KubeObjectStore } from "../../../../common/k8s-api/kube-object.store";

import type { RoleApi } from "@kubesightapp/kube-api";
import type { Role, RoleData } from "@kubesightapp/kube-object";

export class RoleStore extends KubeObjectStore<Role, RoleApi, RoleData> {
  protected sortItems(items: Role[]) {
    return super.sortItems(items, [(role) => role.kind, (role) => role.getName()]);
  }
}
