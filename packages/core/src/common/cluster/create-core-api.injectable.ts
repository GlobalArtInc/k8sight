import { CoreV1Api } from "@kubesightapp/kubernetes-client-node";
import { getInjectable } from "@ogre-tools/injectable";

import type { KubeConfig } from "@kubesightapp/kubernetes-client-node";

export type CreateCoreApi = (config: KubeConfig) => CoreV1Api;

const createCoreApiInjectable = getInjectable({
  id: "create-core-api",
  instantiate: (): CreateCoreApi => (config) => config.makeApiClient(CoreV1Api),
});

export default createCoreApiInjectable;
