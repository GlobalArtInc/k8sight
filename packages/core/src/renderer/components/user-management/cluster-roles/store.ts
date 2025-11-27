import { KubeObjectStore } from "../../../../common/k8s-api/kube-object.store";

import type { ClusterRoleApi } from "@kubesightapp/kube-api";
import type { ClusterRole, ClusterRoleData } from "@kubesightapp/kube-object";

export class ClusterRoleStore extends KubeObjectStore<ClusterRole, ClusterRoleApi, ClusterRoleData> {
  protected sortItems(items: ClusterRole[]) {
    return super.sortItems(items, [(clusterRole) => clusterRole.kind, (clusterRole) => clusterRole.getName()]);
  }
}
