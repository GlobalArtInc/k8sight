import { getInjectionToken } from "@ogre-tools/injectable";

export const k8sightBuildEnvironmentInjectionToken = getInjectionToken<string>({
  id: "k8sight-build-environment-token",
});
