export type K8sightExtensionId = string;

export type K8sightExtensionConstructor = new (ext: InstalledExtension) => LegacyK8sightExtension;
export type BundledK8sightExtensionConstructor = new (ext: BundledInstalledExtension) => LegacyK8sightExtension;

export interface BaseInstalledExtension {
  readonly id: K8sightExtensionId;
  // Absolute path to the non-symlinked source folder,
  // e.g. "/Users/user/.k8sight/extensions/helloworld"
  readonly absolutePath: string;
  // Absolute to the symlinked package.json file
  readonly manifestPath: string;
}

export interface BundledInstalledExtension extends BaseInstalledExtension {
  readonly manifest: BundledK8sightExtensionManifest;
  readonly isBundled: true;
  readonly isCompatible: true;
  readonly isEnabled: true;
}

export interface ExternalInstalledExtension extends BaseInstalledExtension {
  readonly manifest: K8sightExtensionManifest;
  readonly isBundled: false;
  readonly isCompatible: boolean;
  isEnabled: boolean;
}

export type InstalledExtension = BundledInstalledExtension | ExternalInstalledExtension;

export interface LegacyK8sightExtension {
  readonly id: K8sightExtensionId;
  readonly manifest: K8sightExtensionManifest;
  readonly manifestPath: string;
  readonly isBundled: boolean;
  readonly sanitizedExtensionId: string;
  readonly name: string;
  readonly version: string;
  readonly description: string | undefined;
  readonly storeName: string;

  getExtensionFileFolder(): Promise<string>;
  enable(): Promise<void>;
  disable(): Promise<void>;
  activate(): Promise<void>;
}

export interface BundledK8sightExtensionManifest {
  name: string;
  version: string;
  description?: string;
  publishConfig?: Partial<Record<string, string>>;

  /**
   * Specify extension name used for persisting data.
   * Useful if extension is renamed but the data should not be lost.
   */
  storeName?: string;
}

export interface K8sightExtensionManifest extends BundledK8sightExtensionManifest {
  main?: string; // path to %ext/dist/main.js
  renderer?: string; // path to %ext/dist/renderer.js

  /**
   * Supported K8sight version engine by extension could be defined in `manifest.engines.k8sight`
   * Only MAJOR.MINOR version is taken in consideration.
   */
  engines: {
    k8sight: string; // "semver"-package format
    [x: string]: string | undefined;
  };
}
