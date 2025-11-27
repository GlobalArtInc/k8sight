import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import clusterManagerInjectable from "./manager.injectable";

const initializeClusterManagerInjectable = getInjectable({
  id: "initialize-cluster-manager",
  instantiate: (di) => ({
    run: () => {
      const clusterManager = di.inject(clusterManagerInjectable);

      clusterManager.init();
    },
  }),
  injectionToken: onLoadOfApplicationInjectionToken,
  causesSideEffects: true,
});

export default initializeClusterManagerInjectable;
