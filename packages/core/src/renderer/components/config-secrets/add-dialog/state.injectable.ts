import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const addSecretDialogOpenStateInjectable = getInjectable({
  id: "add-secret-dialog-state",
  instantiate: () => observable.box(false),
});

export default addSecretDialogOpenStateInjectable;
