import { getInjectable } from "@ogre-tools/injectable";
import joinPathsInjectable from "../path/join-paths.injectable";
import isProductionInjectable from "./is-production.injectable";
import k8sightResourcesDirInjectable from "./k8sight-resources-dir.injectable";
import normalizedPlatformInjectable from "./normalized-platform.injectable";

const bundledResourcesDirectoryInjectable = getInjectable({
  id: "bundled-resources-directory",
  instantiate: (di) => {
    const isProduction = di.inject(isProductionInjectable);
    const normalizedPlatform = di.inject(normalizedPlatformInjectable);
    const joinPaths = di.inject(joinPathsInjectable);
    const k8sightResourcesDir = di.inject(k8sightResourcesDirInjectable);

    return isProduction
      ? k8sightResourcesDir
      : joinPaths(k8sightResourcesDir, "binaries", "client", normalizedPlatform);
  },
});

export default bundledResourcesDirectoryInjectable;
