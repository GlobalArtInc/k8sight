import { getInjectable } from "@ogre-tools/injectable";
import { dialog } from "electron";

import type { OpenDialogOptions } from "electron";

export type ShowOpenDialog = (options: OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>;

const showOpenDialogInjectable = getInjectable({
  id: "show-open-dialog",
  instantiate: (): ShowOpenDialog => (opts) => dialog.showOpenDialog(opts),
  causesSideEffects: true,
});

export default showOpenDialogInjectable;
