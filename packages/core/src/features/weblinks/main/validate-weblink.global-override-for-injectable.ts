import { getGlobalOverride } from "@kubesightapp/test-utils";
import validateWeblinkInjectable from "./validate-weblink.injectable";

export default getGlobalOverride(validateWeblinkInjectable, () => async () => "available");
