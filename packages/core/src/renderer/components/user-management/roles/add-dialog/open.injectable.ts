import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import addRoleDialogStateInjectable from "./state.injectable";

const openAddRoleDialogInjectable = getInjectable({
  id: "open-add-role-dialog",
  instantiate: (di) => {
    const state = di.inject(addRoleDialogStateInjectable);

    return action(() => {
      state.isOpen.set(true);
      state.namespace.set("");
      state.roleName.set("");
    });
  },
});

export default openAddRoleDialogInjectable;
