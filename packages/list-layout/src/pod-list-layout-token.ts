import { getInjectionToken } from "@ogre-tools/injectable";

import type { Pod } from "@kubesightapp/kube-object";

import type { SpecificKubeListLayoutColumn } from "./kube-list-layout-column";

export const podListLayoutColumnInjectionToken = getInjectionToken<SpecificKubeListLayoutColumn<Pod>>({
  id: "kube-object-list-layout-column",
});
