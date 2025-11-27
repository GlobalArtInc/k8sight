import { getInjectionToken } from "@ogre-tools/injectable";

export const extensionEntryPointNameInjectionToken = getInjectionToken<"main" | "renderer">({
  id: "extension-entry-point-name-token",
});
