import { getGlobalOverride } from "@kubesightapp/test-utils";
import resolveSystemProxyWindowInjectable from "./resolve-system-proxy-window.injectable";

import type { BrowserWindow, Session, WebContents } from "electron";

export default getGlobalOverride(
  resolveSystemProxyWindowInjectable,
  async () =>
    ({
      webContents: {
        session: {
          resolveProxy: () => "DIRECT",
        } as unknown as Session,
      } as unknown as WebContents,
    }) as unknown as BrowserWindow,
);
