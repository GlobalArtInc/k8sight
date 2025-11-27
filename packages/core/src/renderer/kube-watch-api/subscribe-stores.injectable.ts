import { getInjectable } from "@ogre-tools/injectable";
import kubeWatchApiInjectable from "./kube-watch-api.injectable";

const subscribeStoresInjectable = getInjectable({
  id: "subscribe-stores",
  instantiate: (di) => di.inject(kubeWatchApiInjectable).subscribeStores,
});

export default subscribeStoresInjectable;
