import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import addClusterRoleDialogStateInjectable from "./state.injectable";

const closeAddClusterRoleDialogInjectable = getInjectable({
  id: "close-add-cluster-role-dialog",
  instantiate: (di) => {
    const state = di.inject(addClusterRoleDialogStateInjectable);

    return action(() => {
      state.isOpen.set(false);
      state.clusterRoleName.set("");
    });
  },
});

export default closeAddClusterRoleDialogInjectable;
