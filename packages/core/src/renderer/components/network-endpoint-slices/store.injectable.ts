import { endpointSliceApiInjectable, storesAndApisCanBeCreatedInjectionToken } from "@kubesightapp/kube-api-specifics";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import { EndpointSliceStore } from "./store";

const endpointSliceStoreInjectable = getInjectable({
  id: "endpoint-slice-store",
  instantiate: (di) => {
    assert(
      di.inject(storesAndApisCanBeCreatedInjectionToken),
      "endpointSliceStore is only available in certain environments",
    );

    const api = di.inject(endpointSliceApiInjectable);

    return new EndpointSliceStore(
      {
        context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
        logger: di.inject(loggerInjectionToken),
      },
      api,
    );
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default endpointSliceStoreInjectable;
