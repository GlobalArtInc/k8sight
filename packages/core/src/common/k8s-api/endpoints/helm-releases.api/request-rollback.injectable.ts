import { urlBuilderFor } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import apiBaseInjectable from "../../api-base.injectable";

export type RequestHelmReleaseRollback = (name: string, namespace: string, revision: number) => Promise<void>;

const requestRollbackEndpoint = urlBuilderFor("/v2/releases/:namespace/:name/rollback");

const requestHelmReleaseRollbackInjectable = getInjectable({
  id: "request-helm-release-rollback",
  instantiate: (di): RequestHelmReleaseRollback => {
    const apiBase = di.inject(apiBaseInjectable);

    return async (name, namespace, revision) => {
      await apiBase.put(requestRollbackEndpoint.compile({ name, namespace }), { data: { revision } });
    };
  },
});

export default requestHelmReleaseRollbackInjectable;
