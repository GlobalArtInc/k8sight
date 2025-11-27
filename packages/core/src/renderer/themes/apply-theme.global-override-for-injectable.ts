import { getGlobalOverride } from "@kubesightapp/test-utils";
import applyLensThemeInjectable from "./apply-lens-theme.injectable";

export default getGlobalOverride(applyLensThemeInjectable, () => () => {});
