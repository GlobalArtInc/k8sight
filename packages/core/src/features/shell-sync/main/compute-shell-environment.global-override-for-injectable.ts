import { getGlobalOverride } from "@kubesightapp/test-utils";
import computeShellEnvironmentInjectable from "./compute-shell-environment.injectable";

export default getGlobalOverride(computeShellEnvironmentInjectable, () => async () => ({
  callWasSuccessful: true,
}));
