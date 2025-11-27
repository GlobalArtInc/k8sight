import {
  persistentVolumeClaimApiInjectable,
  storesAndApisCanBeCreatedInjectionToken,
} from "@kubesightapp/kube-api-specifics";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { kubeObjectStoreInjectionToken } from "../../../common/k8s-api/api-manager/kube-object-store-token";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import { PersistentVolumeClaimStore } from "./store";

const persistentVolumeClaimStoreInjectable = getInjectable({
  id: "persistent-volume-claim-store",
  instantiate: (di) => {
    assert(
      di.inject(storesAndApisCanBeCreatedInjectionToken),
      "persistentVolumeClaimStore is only available in certain environments",
    );

    const api = di.inject(persistentVolumeClaimApiInjectable);

    return new PersistentVolumeClaimStore(
      {
        context: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
        logger: di.inject(loggerInjectionToken),
      },
      api,
    );
  },
  injectionToken: kubeObjectStoreInjectionToken,
});

export default persistentVolumeClaimStoreInjectable;
