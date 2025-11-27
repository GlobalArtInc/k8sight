import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import fileSystemSeparatorInjectable from "./separator.injectable";

export default getGlobalOverride(fileSystemSeparatorInjectable, () => path.posix.sep);
