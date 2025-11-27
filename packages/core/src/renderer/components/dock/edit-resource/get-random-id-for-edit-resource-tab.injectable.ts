import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";

const getRandomIdForEditResourceTabInjectable = getInjectable({
  id: "get-random-id-for-edit-resource-tab",
  instantiate: (di) => di.inject(getRandomIdInjectionToken),
});

export default getRandomIdForEditResourceTabInjectable;
