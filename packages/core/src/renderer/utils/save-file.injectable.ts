import { getInjectable } from "@ogre-tools/injectable";
import { saveFileDialog } from "./saveFile";

const openSaveFileDialogInjectable = getInjectable({
  id: "open-save-file-dialog",
  instantiate: () => saveFileDialog,
});

export default openSaveFileDialogInjectable;
