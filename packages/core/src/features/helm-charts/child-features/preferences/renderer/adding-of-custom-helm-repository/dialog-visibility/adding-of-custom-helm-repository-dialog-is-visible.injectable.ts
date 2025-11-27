import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const addingOfCustomHelmRepositoryDialogIsVisibleInjectable = getInjectable({
  id: "adding-of-custom-helm-repository-dialog-is-visible",
  instantiate: () => observable.box(false),
});

export default addingOfCustomHelmRepositoryDialogIsVisibleInjectable;
