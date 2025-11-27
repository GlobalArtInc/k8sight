import { apiKubeInjectionToken } from "@kubesightapp/kube-api";
import { getInjectable } from "@ogre-tools/injectable";

export const maybeKubeApiInjectable = getInjectable({
  id: "maybe-kube-api",
  instantiate: (di) => {
    try {
      return di.inject(apiKubeInjectionToken);
    } catch {
      return undefined;
    }
  },
});
