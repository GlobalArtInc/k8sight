import { getGlobalOverride } from "@kubesightapp/test-utils";
import path from "path";
import getDirnameOfPathInjectable from "./get-dirname.injectable";

export default getGlobalOverride(getDirnameOfPathInjectable, () => path.posix.dirname);
