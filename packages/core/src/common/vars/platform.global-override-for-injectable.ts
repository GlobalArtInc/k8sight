import { getGlobalOverride } from "@kubesightapp/test-utils";
import platformInjectable from "./platform.injectable";

export default getGlobalOverride(platformInjectable, () => "darwin");
