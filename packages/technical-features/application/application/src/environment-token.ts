import { getInjectionToken } from "@ogre-tools/injectable";

export const lensBuildEnvironmentInjectionToken = getInjectionToken<string>({
  id: "lens-build-environment-token",
});
