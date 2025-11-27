import { getInjectable } from "@ogre-tools/injectable";
import apiKubeInjectable from "./api-kube.injectable";

import type { KubeJsonApi } from "@kubesightapp/kube-api";

export type ApiKubeGet = KubeJsonApi["get"];

const apiKubeGetInjectable = getInjectable({
  id: "api-kube-get",
  instantiate: (di): ApiKubeGet => {
    const apiKube = di.inject(apiKubeInjectable);

    return (...params) => apiKube.get(...params);
  },
});

export default apiKubeGetInjectable;
