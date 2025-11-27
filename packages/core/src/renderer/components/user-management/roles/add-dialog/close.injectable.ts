import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import addRoleDialogStateInjectable from "./state.injectable";

const closeAddRoleDialogInjectable = getInjectable({
  id: "close-add-role-dialog",
  instantiate: (di) => {
    const state = di.inject(addRoleDialogStateInjectable);

    return action(() => {
      state.isOpen.set(false);
      state.namespace.set("");
      state.roleName.set("");
    });
  },
});

export default closeAddRoleDialogInjectable;
