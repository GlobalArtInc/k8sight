import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import getBasenameOfPathInjectable from "./get-basename.injectable";

export default getGlobalOverride(getBasenameOfPathInjectable, () => path.posix.basename);
