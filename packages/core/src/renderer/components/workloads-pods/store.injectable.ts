import {
  podApiInjectable,
  podMetricsApiInjectable,
  storesAndApisCanBeCreatedInjectionToken,
} from "@kubesightapp/kube-api-specifics";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import { PodStore } from "./store";

const podStoreInjectable = getInjectable({
  id: "pod-store",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "podStore is only available in certain environments");

    const api = di.inject(podApiInjectable);

    return new PodStore(
      {
        podMetricsApi: di.inject(podMetricsApiInjectable),
        context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
        logger: di.inject(loggerInjectionToken),
      },
      api,
    );
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default podStoreInjectable;
