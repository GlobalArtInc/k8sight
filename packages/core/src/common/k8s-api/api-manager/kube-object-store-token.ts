import { getInjectionToken } from "@ogre-tools/injectable";

import type { KubeObjectStore } from "../kube-object.store";

export const kubeObjectStoreInjectionToken = getInjectionToken<KubeObjectStore<any, any, any>>({
  id: "kube-object-store-token",
});
