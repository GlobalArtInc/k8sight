import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import toggleMaximizeWindowInjectable from "./toggle-maximize-window.injectable";

export default getGlobalOverrideForFunction(toggleMaximizeWindowInjectable);
