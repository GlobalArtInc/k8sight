import { parseKubeApi } from "@kubesightapp/kube-api";
import { kubeApiInjectionToken } from "@kubesightapp/kube-api-specifics";
import { getInjectable } from "@ogre-tools/injectable";

import type { KubeApi } from "@kubesightapp/kube-api";

export type GetKubeApiFromPath = (apiPath: string) => KubeApi | undefined;

const getKubeApiFromPathInjectable = getInjectable({
  id: "get-kube-api-from-path",

  instantiate: (di): GetKubeApiFromPath => {
    const kubeApis = di.injectMany(kubeApiInjectionToken);

    return (apiPath: string) => {
      const parsed = parseKubeApi(apiPath);

      return kubeApis.find((api) => api.apiBase === parsed?.apiBase);
    };
  },
});

export default getKubeApiFromPathInjectable;
