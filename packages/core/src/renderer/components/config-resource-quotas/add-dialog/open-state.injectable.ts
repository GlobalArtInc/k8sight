import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const addQuotaDialogOpenStateInjectable = getInjectable({
  id: "add-quota-dialog-open-state",
  instantiate: () => observable.box(false),
});

export default addQuotaDialogOpenStateInjectable;
