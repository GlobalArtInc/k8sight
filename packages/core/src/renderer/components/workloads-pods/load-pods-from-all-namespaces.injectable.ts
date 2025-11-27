import { showErrorNotificationInjectable } from "@kubesightapp/notifications";
import { getInjectable } from "@ogre-tools/injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../../cluster-frame-context/for-namespaced-resources.injectable";
import podStoreInjectable from "./store.injectable";

const loadPodsFromAllNamespacesInjectable = getInjectable({
  id: "load-pods-from-all-namespaces",
  instantiate: (di) => {
    const podStore = di.inject(podStoreInjectable);
    const context = di.inject(clusterFrameContextForNamespacedResourcesInjectable);
    const showErrorNotification = di.inject(showErrorNotificationInjectable);

    return () => {
      podStore.loadAll({
        namespaces: context.allNamespaces,
        onLoadFailure: (error) => showErrorNotification(`Can not load Pods. ${String(error)}`),
      });
    };
  },
});

export default loadPodsFromAllNamespacesInjectable;
