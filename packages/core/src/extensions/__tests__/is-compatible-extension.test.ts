import { isCompatibleExtension } from "../extension-discovery/is-compatible-extension/is-compatible-extension";

import type { K8sightExtensionManifest } from "@kubesightapp/legacy-extensions";

describe("Extension/App versions compatibility checks", () => {
  it("is compatible with exact version matching", () => {
    expect(isCompatible({ extK8sightEngineVersion: "5.5.0", extensionApiVersion: "5.5.0" })).toBeTruthy();
  });

  it("is compatible with upper %PATCH versions of base app", () => {
    expect(isCompatible({ extK8sightEngineVersion: "5.5.0", extensionApiVersion: "5.5.5" })).toBeTruthy();
  });

  it("is compatible with higher %MINOR version of base app", () => {
    expect(isCompatible({ extK8sightEngineVersion: "5.5.0", extensionApiVersion: "5.6.0" })).toBeTruthy();
  });

  it("is not compatible with higher %MAJOR version of base app", () => {
    expect(isCompatible({ extK8sightEngineVersion: "5.6.0", extensionApiVersion: "6.0.0" })).toBeFalsy(); // extension for k8sight@5 not compatible with k8sight@6
    expect(isCompatible({ extK8sightEngineVersion: "6.0.0", extensionApiVersion: "5.6.0" })).toBeFalsy();
  });

  it("supports short version format for manifest.engines.k8sight", () => {
    expect(isCompatible({ extK8sightEngineVersion: "5.5", extensionApiVersion: "5.5.1" })).toBeTruthy();
  });

  it("throws for incorrect or not supported version format", () => {
    expect(() =>
      isCompatible({
        extK8sightEngineVersion: ">=2.0",
        extensionApiVersion: "2.0",
      }),
    ).toThrow(/Invalid format/i);

    expect(() =>
      isCompatible({
        extK8sightEngineVersion: "~2.0",
        extensionApiVersion: "2.0",
      }),
    ).toThrow(/Invalid format/i);

    expect(() =>
      isCompatible({
        extK8sightEngineVersion: "*",
        extensionApiVersion: "1.0",
      }),
    ).toThrow(/Invalid format/i);
  });
});

function isCompatible({ extK8sightEngineVersion = "^1.0", extensionApiVersion = "1.0" } = {}): boolean {
  const extensionManifestMock = getExtensionManifestMock(extK8sightEngineVersion);

  return isCompatibleExtension({ extensionApiVersion })(extensionManifestMock);
}

function getExtensionManifestMock(k8sightEngine = "1.0"): K8sightExtensionManifest {
  return {
    name: "some-extension",
    version: "1.0",
    engines: {
      k8sight: k8sightEngine,
    },
  };
}
