import { getGlobalOverride } from "@kubesightapp/test-utils";
import computeUnixShellEnvironmentInjectable from "./compute-unix-shell-environment.injectable";

export default getGlobalOverride(computeUnixShellEnvironmentInjectable, () => async () => {
  throw new Error("Tried to get unix shell env without override");
});
