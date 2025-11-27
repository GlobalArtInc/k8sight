import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";

export interface TrayIcon {
  iconPath: string;
  priority: number;
  shouldBeShown: IComputedValue<boolean>;
}

export const trayIconInjectionToken = getInjectionToken<TrayIcon>({
  id: "tray-icon-token",
});
