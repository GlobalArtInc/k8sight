import { getInjectable } from "@ogre-tools/injectable";
import userPreferencesStateInjectable from "./state.injectable";

const kubeconfigSyncsInjectable = getInjectable({
  id: "kubeconfig-syncs",
  instantiate: (di) => di.inject(userPreferencesStateInjectable).syncKubeconfigEntries,
});

export default kubeconfigSyncsInjectable;
