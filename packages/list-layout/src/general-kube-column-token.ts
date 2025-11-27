import { getInjectionToken } from "@ogre-tools/injectable";

import type { GeneralKubeObjectListLayoutColumn } from "./kube-list-layout-column";

export const kubeObjectListLayoutColumnInjectionToken = getInjectionToken<GeneralKubeObjectListLayoutColumn>({
  id: "kube-object-list-layout-column",
});
