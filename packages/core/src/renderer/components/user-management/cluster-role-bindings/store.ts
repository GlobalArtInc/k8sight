import { HashSet } from "@kubesightapp/utilities";
import { KubeObjectStore } from "../../../../common/k8s-api/kube-object.store";
import { hashSubject } from "../hashers";

import type { ClusterRoleBindingApi } from "@kubesightapp/kube-api";
import type { ClusterRoleBinding, ClusterRoleBindingData, Subject } from "@kubesightapp/kube-object";

export class ClusterRoleBindingStore extends KubeObjectStore<
  ClusterRoleBinding,
  ClusterRoleBindingApi,
  ClusterRoleBindingData
> {
  protected sortItems(items: ClusterRoleBinding[]) {
    return super.sortItems(items, [
      (clusterRoleBinding) => clusterRoleBinding.kind,
      (clusterRoleBinding) => clusterRoleBinding.getName(),
    ]);
  }

  async updateSubjects(clusterRoleBinding: ClusterRoleBinding, subjects: Subject[]) {
    return this.update(clusterRoleBinding, {
      roleRef: clusterRoleBinding.roleRef,
      subjects,
    });
  }

  async removeSubjects(clusterRoleBinding: ClusterRoleBinding, subjectsToRemove: Iterable<Subject>) {
    const currentSubjects = new HashSet(clusterRoleBinding.getSubjects(), hashSubject);

    for (const subject of subjectsToRemove) {
      currentSubjects.delete(subject);
    }

    return this.updateSubjects(clusterRoleBinding, currentSubjects.toJSON());
  }
}
