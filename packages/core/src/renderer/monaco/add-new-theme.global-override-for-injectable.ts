import { getGlobalOverride } from "@kubesightapp/test-utils";
import addNewMonacoThemeInjectable from "./add-new-theme.injectable";

export default getGlobalOverride(addNewMonacoThemeInjectable, () => () => {});
