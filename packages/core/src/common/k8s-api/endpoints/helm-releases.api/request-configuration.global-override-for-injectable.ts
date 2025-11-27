import { getGlobalOverride } from "@kubesightapp/test-utils";
import requestHelmReleaseConfigurationInjectable from "./request-configuration.injectable";

export default getGlobalOverride(requestHelmReleaseConfigurationInjectable, () => () => {
  throw new Error("Tried to call requestHelmReleaseConfiguration with no override");
});
