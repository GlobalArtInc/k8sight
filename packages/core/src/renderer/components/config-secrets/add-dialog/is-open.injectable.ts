import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import addSecretDialogOpenStateInjectable from "./state.injectable";

const isAddSecretDialogOpenInjectable = getInjectable({
  id: "is-add-secret-dialog-open",
  instantiate: (di) => {
    const state = di.inject(addSecretDialogOpenStateInjectable);

    return computed(() => state.get());
  },
});

export default isAddSecretDialogOpenInjectable;
