import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";

const getRandomIdForPodLogsTabInjectable = getInjectable({
  id: "get-random-id-for-pod-logs-tab",
  instantiate: (di) => di.inject(getRandomIdInjectionToken),
});

export default getRandomIdForPodLogsTabInjectable;
