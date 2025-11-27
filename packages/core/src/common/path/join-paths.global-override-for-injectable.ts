import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import joinPathsInjectable from "./join-paths.injectable";

export default getGlobalOverride(joinPathsInjectable, () => path.posix.join);
