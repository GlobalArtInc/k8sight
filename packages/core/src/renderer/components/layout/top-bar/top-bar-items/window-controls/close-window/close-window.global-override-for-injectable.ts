import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import closeWindowInjectable from "./close-window.injectable";

export default getGlobalOverrideForFunction(closeWindowInjectable);
