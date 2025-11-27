import { getGlobalOverride } from "@kubesightapp/test-utils";
import isDebuggingInjectable from "./is-debugging.injectable";

export default getGlobalOverride(isDebuggingInjectable, () => false);
