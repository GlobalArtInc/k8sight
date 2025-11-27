import { getGlobalOverride } from "@kubesightapp/test-utils";
import loadTerminalFontInjectable from "./load-font.injectable";

export default getGlobalOverride(loadTerminalFontInjectable, () => async () => {});
