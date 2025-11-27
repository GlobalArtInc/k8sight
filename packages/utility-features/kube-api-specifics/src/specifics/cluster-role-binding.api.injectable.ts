import { ClusterRoleBindingApi } from "@kubesightapp/kube-api";
import { logErrorInjectionToken, logInfoInjectionToken, logWarningInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "./can-be-created-token";
import { maybeKubeApiInjectable } from "./maybe-kube-api.injectable";
import { kubeApiInjectionToken } from "./token";

export const clusterRoleBindingApiInjectable = getInjectable({
  id: "cluster-role-binding-api",
  instantiate: (di) => {
    assert(
      di.inject(storesAndApisCanBeCreatedInjectionToken),
      "clusterRoleBindingApi is only accessible in certain environments",
    );

    return new ClusterRoleBindingApi({
      logError: di.inject(logErrorInjectionToken),
      logInfo: di.inject(logInfoInjectionToken),
      logWarn: di.inject(logWarningInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});
