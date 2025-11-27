import { getInjectionToken } from "@ogre-tools/injectable";

import type { KubeJsonApi } from "./kube-json-api";

export const apiKubeInjectionToken = getInjectionToken<KubeJsonApi>({
  id: "api-kube-injection-token",
});
