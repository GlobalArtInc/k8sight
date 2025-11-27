import { getGlobalOverride } from "@kubesightapp/test-utils";
import defaultShellInjectable from "./default-shell.injectable";

export default getGlobalOverride(defaultShellInjectable, () => "some-default-shell");
