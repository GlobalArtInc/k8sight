import { lensBuildEnvironmentInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const lensBuildEnvironmentInjectable = getInjectable({
  id: "lens-build-environment",
  instantiate: () => "unknown",
  injectionToken: lensBuildEnvironmentInjectionToken,
});

export default lensBuildEnvironmentInjectable;
