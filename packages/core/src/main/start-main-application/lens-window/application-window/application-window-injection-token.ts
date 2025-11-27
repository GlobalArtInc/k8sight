import { getInjectionToken } from "@ogre-tools/injectable";

import type { LensWindow } from "./create-lens-window.injectable";

export const applicationWindowInjectionToken = getInjectionToken<LensWindow>({
  id: "application-window-injection-token",
});
