import { storesAndApisCanBeCreatedInjectionToken } from "@kubesightapp/kube-api-specifics";
import { getInjectable } from "@ogre-tools/injectable";

const storesAndApisCanBeCreatedInjectable = getInjectable({
  id: "create-stores-and-apis",
  instantiate: () => false,
  injectionToken: storesAndApisCanBeCreatedInjectionToken,
});

export default storesAndApisCanBeCreatedInjectable;
