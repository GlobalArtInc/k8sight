import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import addSecretDialogOpenStateInjectable from "./state.injectable";

const closeAddSecretDialogInjectable = getInjectable({
  id: "close-add-secret-dialog",
  instantiate: (di) => {
    const state = di.inject(addSecretDialogOpenStateInjectable);

    return action(() => state.set(false));
  },
});

export default closeAddSecretDialogInjectable;
