import { getGlobalOverride } from "@kubesightapp/test-utils";
import ipcMainInjectable from "./ipc-main.injectable";

import type { IpcMain } from "electron";

export default getGlobalOverride(
  ipcMainInjectable,
  () =>
    ({
      handle: () => {},
      on: () => {},
      off: () => {},
    }) as unknown as IpcMain,
);
