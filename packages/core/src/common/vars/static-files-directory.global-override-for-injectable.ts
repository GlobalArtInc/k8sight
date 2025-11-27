import { getGlobalOverride } from "@kubesightapp/test-utils";
import staticFilesDirectoryInjectable from "./static-files-directory.injectable";

export default getGlobalOverride(staticFilesDirectoryInjectable, () => "/some-static-directory");
