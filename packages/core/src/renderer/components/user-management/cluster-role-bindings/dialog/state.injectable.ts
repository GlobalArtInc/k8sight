import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { ClusterRoleBinding } from "@kubesightapp/kube-object";

export type ClusterRoleBindingDialogState =
  | {
      isOpen: false;
      clusterRoleBinding?: undefined;
    }
  | {
      isOpen: true;
      clusterRoleBinding: ClusterRoleBinding | undefined;
    };

const clusterRoleBindingDialogStateInjectable = getInjectable({
  id: "cluster-role-binding-dialog-state",
  instantiate: () =>
    observable.box<ClusterRoleBindingDialogState>({
      isOpen: false,
    }),
});

export default clusterRoleBindingDialogStateInjectable;
