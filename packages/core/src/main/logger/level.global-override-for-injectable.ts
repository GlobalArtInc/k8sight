import { getGlobalOverride } from "@kubesightapp/test-utils";
import logLevelInjectable from "./level.injectable";

export default getGlobalOverride(logLevelInjectable, () => "error");
