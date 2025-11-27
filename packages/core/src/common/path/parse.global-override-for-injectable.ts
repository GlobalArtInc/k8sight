import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import parsePathInjectable from "./parse.injectable";

export default getGlobalOverride(parsePathInjectable, () => path.posix.parse);
