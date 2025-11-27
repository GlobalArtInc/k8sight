import { getInjectionToken } from "@ogre-tools/injectable";

import type { KubeApi } from "@kubesightapp/kube-api";

export const kubeApiInjectionToken = getInjectionToken<KubeApi<any, any>>({
  id: "kube-api-injection-token",
});
