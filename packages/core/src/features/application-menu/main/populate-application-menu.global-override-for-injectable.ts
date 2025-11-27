import { getGlobalOverride } from "@kubesightapp/test-utils";
import populateApplicationMenuInjectable from "./populate-application-menu.injectable";

export default getGlobalOverride(populateApplicationMenuInjectable, () => () => {});
