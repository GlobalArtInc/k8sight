import { getInjectable } from "@ogre-tools/injectable";
import apiKubeInjectable from "./api-kube.injectable";

import type { KubeJsonApi } from "@kubesightapp/kube-api";

export type ApiKubePatch = KubeJsonApi["patch"];

const apiKubePatchInjectable = getInjectable({
  id: "api-kube-patch",
  instantiate: (di): ApiKubePatch => {
    const apiKube = di.inject(apiKubeInjectable);

    return (...params) => apiKube.patch(...params);
  },
});

export default apiKubePatchInjectable;
