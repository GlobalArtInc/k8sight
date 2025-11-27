import { getGlobalOverride } from "@kubesightapp/test-utils";
import tempDirectoryPathInjectable from "./temp-directory-path.injectable";

export default getGlobalOverride(tempDirectoryPathInjectable, () => "/some-temp-directory");
