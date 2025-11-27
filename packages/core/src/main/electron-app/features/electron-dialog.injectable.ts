import { getInjectable } from "@ogre-tools/injectable";
import { dialog } from "electron";

const electronDialogInjectable = getInjectable({
  id: "electron-dialog",
  instantiate: () => dialog,
  causesSideEffects: true,
});

export default electronDialogInjectable;
