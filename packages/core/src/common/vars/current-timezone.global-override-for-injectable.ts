import { getGlobalOverride } from "@kubesightapp/test-utils";
import currentTimezoneInjectable from "./current-timezone.injectable";

export default getGlobalOverride(currentTimezoneInjectable, () => "Etc/GMT");
