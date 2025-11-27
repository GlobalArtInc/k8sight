import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import addQuotaDialogOpenStateInjectable from "./open-state.injectable";

const openAddQuotaDialogInjectable = getInjectable({
  id: "open-add-quota-dialog",
  instantiate: (di) => {
    const state = di.inject(addQuotaDialogOpenStateInjectable);

    return action(() => state.set(true));
  },
});

export default openAddQuotaDialogInjectable;
