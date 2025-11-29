import { getInjectable } from "@ogre-tools/injectable";
import isProductionInjectable from "./is-production.injectable";

const k8sightResourcesDirInjectable = getInjectable({
  id: "k8sight-resources-dir",

  instantiate: (di) => {
    const isProduction = di.inject(isProductionInjectable);

    return isProduction ? process.resourcesPath : process.cwd();
  },

  causesSideEffects: true,
});

export default k8sightResourcesDirInjectable;
