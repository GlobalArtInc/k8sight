import semver from "semver";

import type { LensExtensionManifest } from "@kubesightapp/legacy-extensions";

interface Dependencies {
  extensionApiVersion: string;
}

export const isCompatibleExtension = ({
  extensionApiVersion,
}: Dependencies): ((manifest: LensExtensionManifest) => boolean) => {
  return (manifest: LensExtensionManifest): boolean => {
    const manifestLensEngine = manifest.engines.k8sight;
    const validVersion = manifestLensEngine.match(/^[\^0-9]\d*\.\d+\b/); // must start from ^ or number

    if (!validVersion) {
      const errorInfo = [
        `Invalid format for "manifest.engines.k8sight"="${manifestLensEngine}"`,
        `Range versions can only be specified starting with '^'.`,
        `Otherwise it's recommended to use plain %MAJOR.%MINOR to match with supported K8Sight version.`,
      ].join("\n");

      throw new Error(errorInfo);
    }

    const { major: extMajor, minor: extMinor } = semver.coerce(manifestLensEngine, {
      loose: true,
    }) as semver.SemVer;
    const supportedVersionsByExtension = semver.validRange(`^${extMajor}.${extMinor}`) as string;

    return semver.satisfies(extensionApiVersion, supportedVersionsByExtension, {
      loose: true,
      includePrerelease: false,
    });
  };
};
