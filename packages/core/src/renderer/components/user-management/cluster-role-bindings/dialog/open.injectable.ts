import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import editClusterRoleBindingNameStateInjectable from "./edit-name-state.injectable";
import clusterRoleBindingDialogStateInjectable from "./state.injectable";

import type { ClusterRoleBinding } from "@kubesightapp/kube-object";

export type OpenClusterRoleBindingDialog = (clusterRoleBinding?: ClusterRoleBinding) => void;

const openClusterRoleBindingDialogInjectable = getInjectable({
  id: "open-cluster-role-binding-dialog",
  instantiate: (di): OpenClusterRoleBindingDialog => {
    const state = di.inject(clusterRoleBindingDialogStateInjectable);
    const editNameState = di.inject(editClusterRoleBindingNameStateInjectable);

    return action((clusterRoleBinding) => {
      state.set({
        isOpen: true,
        clusterRoleBinding,
      });
      editNameState.set(clusterRoleBinding?.getName() ?? "");
    });
  },
});

export default openClusterRoleBindingDialogInjectable;
