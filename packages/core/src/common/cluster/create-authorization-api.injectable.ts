import { AuthorizationV1Api } from "@kubesightapp/kubernetes-client-node";
import { getInjectable } from "@ogre-tools/injectable";

import type { KubeConfig } from "@kubesightapp/kubernetes-client-node";

export type CreateAuthorizationApi = (config: KubeConfig) => AuthorizationV1Api;

const createAuthorizationApiInjectable = getInjectable({
  id: "create-authorization-api",
  instantiate: (): CreateAuthorizationApi => (config) => config.makeApiClient(AuthorizationV1Api),
});

export default createAuthorizationApiInjectable;
