import { getGlobalOverride } from "@kubesightapp/test-utils";
import extensionApiVersionInjectable from "./extension-api-version.injectable";

export default getGlobalOverride(extensionApiVersionInjectable, () => "6.0.0");
