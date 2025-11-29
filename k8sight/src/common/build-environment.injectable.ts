import { k8sightBuildEnvironmentInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const k8sightBuildEnvironmentInjectable = getInjectable({
  id: "k8sight-build-environment",
  instantiate: () => "unknown",
  injectionToken: k8sightBuildEnvironmentInjectionToken,
});

export default k8sightBuildEnvironmentInjectable;
