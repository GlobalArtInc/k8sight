import { getGlobalOverride } from "@kubesightapp/test-utils";
import saveKubeconfigInjectable from "./save-kubeconfig.injectable";

export default getGlobalOverride(saveKubeconfigInjectable, () => async () => {
  throw new Error("tried to save a mondified kubeconfig without override");
});
