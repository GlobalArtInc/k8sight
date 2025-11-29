import { getGlobalOverride } from "@kubesightapp/test-utils";
import applyThemeInjectable from "./apply-k8sight-theme.injectable";

export default getGlobalOverride(applyThemeInjectable, () => () => {});
