import { getGlobalOverride } from "@kubesightapp/test-utils";
import ipcRendererInjectable from "./ipc-renderer.injectable";

import type { IpcRenderer } from "electron";

export default getGlobalOverride(
  ipcRendererInjectable,
  () =>
    ({
      invoke: () => {},
      on: () => {},
    }) as unknown as IpcRenderer,
);
