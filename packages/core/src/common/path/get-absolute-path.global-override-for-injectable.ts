import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import getAbsolutePathInjectable from "./get-absolute-path.injectable";

export default getGlobalOverride(getAbsolutePathInjectable, () => path.posix.resolve);
