import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import roleBindingDialogStateInjectable from "./state.injectable";

const closeRoleBindingDialogInjectable = getInjectable({
  id: "close-role-binding-dialog",
  instantiate: (di) => {
    const state = di.inject(roleBindingDialogStateInjectable);

    return action(() => state.set({ isOpen: false }));
  },
});

export default closeRoleBindingDialogInjectable;
