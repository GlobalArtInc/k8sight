import { getInjectionToken } from "@ogre-tools/injectable";

import type { BundledK8sightExtensionConstructor, BundledK8sightExtensionManifest } from "./k8sight-extension";

export type BundledExtensionResult = BundledK8sightExtensionConstructor | null;

export interface BundledExtension {
  readonly manifest: BundledK8sightExtensionManifest;
  main: () => BundledExtensionResult | Promise<BundledExtensionResult>;
  renderer: () => BundledExtensionResult | Promise<BundledExtensionResult>;
}

export const bundledExtensionInjectionToken = getInjectionToken<BundledExtension>({
  id: "bundled-extension-path",
});
