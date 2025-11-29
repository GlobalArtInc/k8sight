import { getInjectionToken } from "@ogre-tools/injectable";

import type { K8sightWindow } from "./create-k8sight-window.injectable";

export const applicationWindowInjectionToken = getInjectionToken<K8sightWindow>({
  id: "application-window-injection-token",
});
