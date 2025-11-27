import { getInjectionToken } from "@ogre-tools/injectable";

import type { IpcMain } from "electron";

const ipcMainInjectionToken = getInjectionToken<IpcMain>({
  id: "ipc-main-injection-token",
});

export default ipcMainInjectionToken;
