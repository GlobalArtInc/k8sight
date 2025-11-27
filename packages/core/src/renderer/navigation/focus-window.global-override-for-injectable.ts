import { getGlobalOverride } from "@kubesightapp/test-utils";
import focusWindowInjectable from "./focus-window.injectable";

export default getGlobalOverride(focusWindowInjectable, () => () => {});
