import { resourceQuotaApiInjectable, storesAndApisCanBeCreatedInjectionToken } from "@kubesightapp/kube-api-specifics";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import { ResourceQuotaStore } from "./store";

const resourceQuotaStoreInjectable = getInjectable({
  id: "resource-quota-store",
  instantiate: (di) => {
    assert(
      di.inject(storesAndApisCanBeCreatedInjectionToken),
      "resourceQuotaStore is only available in certain environments",
    );

    const api = di.inject(resourceQuotaApiInjectable);

    return new ResourceQuotaStore(
      {
        context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
        logger: di.inject(loggerInjectionToken),
      },
      api,
    );
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default resourceQuotaStoreInjectable;
