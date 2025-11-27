import { getInjectionToken } from "@ogre-tools/injectable";

import type { KubeApi } from "@kubesightapp/kube-api";

export const customResourceDefinitionApiInjectionToken = getInjectionToken<KubeApi>({
  id: "custom-resource-definition-api-token",
});
