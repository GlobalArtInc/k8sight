import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { IObservableValue } from "mobx";

export interface AddRoleDialogState {
  readonly isOpen: IObservableValue<boolean>;
  readonly roleName: IObservableValue<string>;
  readonly namespace: IObservableValue<string>;
}

const addRoleDialogStateInjectable = getInjectable({
  id: "add-role-dialog-state",
  instantiate: (): AddRoleDialogState => ({
    isOpen: observable.box(false),
    roleName: observable.box(""),
    namespace: observable.box(""),
  }),
});

export default addRoleDialogStateInjectable;
