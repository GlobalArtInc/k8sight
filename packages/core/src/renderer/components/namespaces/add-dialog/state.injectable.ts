import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const addNamespaceDialogStateInjectable = getInjectable({
  id: "add-namespace-dialog-state",
  instantiate: () => observable.box(false),
});

export default addNamespaceDialogStateInjectable;
