import { clusterRoleApiInjectable, storesAndApisCanBeCreatedInjectionToken } from "@kubesightapp/kube-api-specifics";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { kubeObjectStoreInjectionToken } from "../../../../common/k8s-api/api-manager/kube-object-store-token";
import clusterFrameContextForClusterScopedResourcesInjectable from "../../../cluster-frame-context/for-cluster-scoped-resources.injectable";
import { ClusterRoleStore } from "./store";

const clusterRoleStoreInjectable = getInjectable({
  id: "cluster-role-store",
  instantiate: (di) => {
    assert(
      di.inject(storesAndApisCanBeCreatedInjectionToken),
      "clusterRoleStore is only available in certain environments",
    );

    const api = di.inject(clusterRoleApiInjectable);

    return new ClusterRoleStore(
      {
        context: di.inject(clusterFrameContextForClusterScopedResourcesInjectable),
        logger: di.inject(loggerInjectionToken),
      },
      api,
    );
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default clusterRoleStoreInjectable;
