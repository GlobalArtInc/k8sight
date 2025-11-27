import { afterApplicationIsLoadedInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import catalogEntityRegistryInjectable from "../../../catalog/entity-registry.injectable";
import kubeconfigSyncManagerInjectable from "../../../catalog-sources/kubeconfig-sync/manager.injectable";

const addKubeconfigSyncAsEntitySourceInjectable = getInjectable({
  id: "add-kubeconfig-sync-as-entity-source",
  instantiate: (di) => ({
    run: () => {
      const kubeConfigSyncManager = di.inject(kubeconfigSyncManagerInjectable);
      const entityRegistry = di.inject(catalogEntityRegistryInjectable);

      entityRegistry.addComputedSource("kubeconfig-sync", kubeConfigSyncManager.source);
    },
  }),
  injectionToken: afterApplicationIsLoadedInjectionToken,
});

export default addKubeconfigSyncAsEntitySourceInjectable;
