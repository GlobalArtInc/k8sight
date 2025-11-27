import { getGlobalOverride } from "@kubesightapp/test-utils";
import directoryForIntegrationTestingInjectable from "./directory-for-integration-testing.injectable";

export default getGlobalOverride(directoryForIntegrationTestingInjectable, () => undefined);
