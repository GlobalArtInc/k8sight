import { storesAndApisCanBeCreatedInjectionToken } from "@kubesightapp/kube-api-specifics";
import { getInjectable } from "@ogre-tools/injectable";
import hostedClusterIdInjectable from "./cluster-frame-context/hosted-cluster-id.injectable";

const storesAndApisCanBeCreatedInjectable = getInjectable({
  id: "create-stores-and-apis",

  instantiate: (di) => {
    const hostedClusterId = di.inject(hostedClusterIdInjectable);

    return !!hostedClusterId;
  },

  injectionToken: storesAndApisCanBeCreatedInjectionToken,
});

export default storesAndApisCanBeCreatedInjectable;
