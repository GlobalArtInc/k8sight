import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";
import type React from "react";

export interface StatusBarItem {
  origin?: string;
  component: React.ComponentType<any>;
  position: "left" | "right";
  visible: IComputedValue<boolean>;
}

export const statusBarItemInjectionToken = getInjectionToken<StatusBarItem>({
  id: "status-bar-item",
});
