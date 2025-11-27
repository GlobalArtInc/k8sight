import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import getRelativePathInjectable from "./get-relative-path.injectable";

export default getGlobalOverride(getRelativePathInjectable, () => path.posix.relative);
