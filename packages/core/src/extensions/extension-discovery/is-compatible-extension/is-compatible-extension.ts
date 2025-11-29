import semver from "semver";

import type { K8sightExtensionManifest } from "@kubesightapp/legacy-extensions";

interface Dependencies {
  extensionApiVersion: string;
}

export const isCompatibleExtension = ({
  extensionApiVersion,
}: Dependencies): ((manifest: K8sightExtensionManifest) => boolean) => {
  return (manifest: K8sightExtensionManifest): boolean => {
    const manifestK8sightEngine = manifest.engines.k8sight;
    const validVersion = manifestK8sightEngine.match(/^[\^0-9]\d*\.\d+\b/); // must start from ^ or number

    if (!validVersion) {
      const errorInfo = [
        `Invalid format for "manifest.engines.k8sight"="${manifestK8sightEngine}"`,
        `Range versions can only be specified starting with '^'.`,
        `Otherwise it's recommended to use plain %MAJOR.%MINOR to match with supported K8Sight version.`,
      ].join("\n");

      throw new Error(errorInfo);
    }

    const { major: extMajor, minor: extMinor } = semver.coerce(manifestK8sightEngine, {
      loose: true,
    }) as semver.SemVer;
    const supportedVersionsByExtension = semver.validRange(`^${extMajor}.${extMinor}`) as string;

    return semver.satisfies(extensionApiVersion, supportedVersionsByExtension, {
      loose: true,
      includePrerelease: false,
    });
  };
};
