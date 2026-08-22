import { getInjectable } from "@ogre-tools/injectable";
import directoryForKubeConfigsInjectable from "../../../common/app-paths/directory-for-kube-configs/directory-for-kube-configs.injectable";
import homeDirectoryPathInjectable from "../../../common/os/home-directory-path.injectable";
import joinPathsInjectable from "../../../common/path/join-paths.injectable";
import kubeconfigSyncsInjectable from "../../../features/user-preferences/common/kubeconfig-syncs.injectable";
import kubeconfigSyncLoggerInjectable from "./logger.injectable";
import { KubeconfigSyncManager } from "./manager";
import watchKubeconfigFileChangesInjectable from "./watch-file-changes.injectable";

const kubeconfigSyncManagerInjectable = getInjectable({
  id: "kubeconfig-sync-manager",

  instantiate: (di) =>
    new KubeconfigSyncManager({
      directoryForKubeConfigs: di.inject(directoryForKubeConfigsInjectable),
      primaryKubeconfigPath: di.inject(joinPathsInjectable)(di.inject(homeDirectoryPathInjectable), ".kube", "config"),
      logger: di.inject(kubeconfigSyncLoggerInjectable),
      watchKubeconfigFileChanges: di.inject(watchKubeconfigFileChangesInjectable),
      kubeconfigSyncs: di.inject(kubeconfigSyncsInjectable),
    }),
});

export default kubeconfigSyncManagerInjectable;
