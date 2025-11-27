import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import clusterFrameContextForNamespacedResourcesInjectable from "../cluster-frame-context/for-namespaced-resources.injectable";
import { KubeWatchApi } from "./kube-watch-api";

const kubeWatchApiInjectable = getInjectable({
  id: "kube-watch-api",

  instantiate: (di) =>
    new KubeWatchApi({
      clusterContext: di.inject(clusterFrameContextForNamespacedResourcesInjectable),
      logger: di.inject(loggerInjectionToken),
    }),
});

export default kubeWatchApiInjectable;
