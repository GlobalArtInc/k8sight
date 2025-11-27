import { getGlobalOverride } from "@kubesightapp/test-utils";
import lensResourcesDirInjectable from "./lens-resources-dir.injectable";

export default getGlobalOverride(lensResourcesDirInjectable, () => "/irrelavent-dir-for-lens-resources");
