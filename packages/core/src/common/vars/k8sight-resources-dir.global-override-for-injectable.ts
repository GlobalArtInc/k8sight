import { getGlobalOverride } from "@kubesightapp/test-utils";
import k8sightResourcesDirInjectable from "./k8sight-resources-dir.injectable";

export default getGlobalOverride(k8sightResourcesDirInjectable, () => "/irrelavent-dir-for-k8sight-resources");
