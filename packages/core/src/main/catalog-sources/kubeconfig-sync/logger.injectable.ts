import { prefixedLoggerInjectable } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";

const kubeconfigSyncLoggerInjectable = getInjectable({
  id: "kubeconfig-sync-logger",
  instantiate: (di) => di.inject(prefixedLoggerInjectable, "KUBECONFIG-SYNC"),
});

export default kubeconfigSyncLoggerInjectable;
