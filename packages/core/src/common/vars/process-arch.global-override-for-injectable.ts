import { getGlobalOverride } from "@kubesightapp/test-utils";
import processArchInjectable from "./process-arch.injectable";

export default getGlobalOverride(processArchInjectable, () => "x64");
