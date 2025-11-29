import { EventEmitter } from "@kubesightapp/event-emitter";
import { isDefined, iter } from "@kubesightapp/utilities";
import assert from "assert";
import { ipcMain, ipcRenderer } from "electron";
import { isEqual } from "lodash";
import { action, computed, observable, reaction, runInAction, toJS, when } from "mobx";
import { broadcastMessage, ipcMainHandle, ipcMainOn, ipcRendererOn } from "../../common/ipc";
import {
  extensionLoaderFromMainChannel,
  extensionLoaderFromRendererChannel,
} from "../../common/ipc/extension-handling";
import { requestExtensionLoaderInitialState } from "../../renderer/ipc";

import type {
  BundledExtension,
  BundledInstalledExtension,
  ExternalInstalledExtension,
  InstalledExtension,
  K8sightExtensionConstructor,
  K8sightExtensionId,
  LegacyK8sightExtension,
} from "@kubesightapp/legacy-extensions";
import type { Logger } from "@kubesightapp/logger";

import type { ObservableMap } from "mobx";

import type { GetDirnameOfPath } from "../../common/path/get-dirname.injectable";
import type { JoinPaths } from "../../common/path/join-paths.injectable";
import type { UpdateExtensionsState } from "../../features/extensions/enabled/common/update-state.injectable";
import type { K8sightExtension } from "../k8sight-extension";
import type { Extension } from "./extension/extension.injectable";

const logModule = "[EXTENSIONS-LOADER]";

interface Dependencies {
  readonly extensionInstances: ObservableMap<K8sightExtensionId, LegacyK8sightExtension>;
  readonly bundledExtensions: BundledExtension[];
  readonly logger: Logger;
  readonly extensionEntryPointName: "main" | "renderer";
  updateExtensionsState: UpdateExtensionsState;
  getExtension: (instance: LegacyK8sightExtension) => Extension;
  joinPaths: JoinPaths;
  getDirnameOfPath: GetDirnameOfPath;
}

interface ExtensionBeingActivated {
  instance: K8sightExtension;
  installedExtension: InstalledExtension;
  activated: Promise<void>;
}

export interface ExtensionLoading {
  isBundled: boolean;
  loaded: Promise<void>;
}

/**
 * Loads installed extensions to the K8sight application
 */
export class ExtensionLoader {
  protected readonly extensions = observable.map<K8sightExtensionId, InstalledExtension>();

  /**
   * This is the set of extensions that don't come with either
   * - Main.K8sightExtension when running in the main process
   * - Renderer.K8sightExtension when running in the renderer process
   */
  protected readonly nonInstancesByName = observable.set<string>();

  protected readonly instancesByName = computed(
    () =>
      new Map(
        iter.chain(this.dependencies.extensionInstances.entries()).map(([, instance]) => [instance.name, instance]),
      ),
  );

  private readonly onRemoveExtensionId = new EventEmitter<[string]>();

  readonly isLoaded = observable.box(false);

  constructor(protected readonly dependencies: Dependencies) {}

  readonly userExtensions = computed(
    () => new Map(this.extensions.toJSON().filter(([, extension]) => !extension.isBundled)),
  );

  /**
   * Get the extension instance by its manifest name
   * @param name The name of the extension
   * @returns one of the following:
   * - the instance of `Main.K8sightExtension` on the main process if created
   * - the instance of `Renderer.K8sightExtension` on the renderer process if created
   * - `null` if no class definition is provided for the current process
   * - `undefined` if the name is not known about
   */
  getInstanceByName(name: string): LegacyK8sightExtension | null | undefined {
    if (this.nonInstancesByName.has(name)) {
      return null;
    }

    return this.instancesByName.get().get(name);
  }

  // Transform userExtensions to a state object for storing into ExtensionsStore
  readonly storeState = computed(() =>
    Array.from(
      this.userExtensions.get(),
      ([extId, extension]) =>
        [
          extId,
          {
            enabled: extension.isEnabled,
            name: extension.manifest.name,
          },
        ] as const,
    ),
  );

  async init() {
    if (ipcMain) {
      await this.initMain();
    } else {
      await this.initRenderer();
    }

    await when(() => this.isLoaded.get());

    // broadcasting extensions between main/renderer processes
    reaction(
      () => this.toJSON(),
      () => this.broadcastExtensions(),
      {
        fireImmediately: true,
      },
    );

    reaction(
      () => this.storeState.get(),
      (state) => {
        this.dependencies.updateExtensionsState(state);
      },
    );
  }

  initExtensions(extensions: Map<K8sightExtensionId, InstalledExtension>) {
    this.extensions.replace(extensions);
  }

  addExtension(extension: InstalledExtension) {
    this.extensions.set(extension.id, extension);
  }

  @action
  removeInstance(k8sightExtensionId: K8sightExtensionId) {
    this.dependencies.logger.info(`${logModule} deleting extension instance ${k8sightExtensionId}`);
    const instance = this.dependencies.extensionInstances.get(k8sightExtensionId);

    if (!instance) {
      return;
    }

    try {
      instance.disable();

      const extension = this.dependencies.getExtension(instance);

      extension.deregister();

      this.onRemoveExtensionId.emit(instance.id);
      this.dependencies.extensionInstances.delete(k8sightExtensionId);
      this.nonInstancesByName.delete(instance.name);
    } catch (error) {
      this.dependencies.logger.error(`${logModule}: deactivation extension error`, { k8sightExtensionId, error });
    }
  }

  removeExtension(k8sightExtensionId: K8sightExtensionId) {
    this.removeInstance(k8sightExtensionId);

    if (!this.extensions.delete(k8sightExtensionId)) {
      throw new Error(`Can't remove extension ${k8sightExtensionId}, doesn't exist.`);
    }
  }

  setIsEnabled(k8sightExtensionId: K8sightExtensionId, isEnabled: boolean) {
    const extension = this.extensions.get(k8sightExtensionId);

    assert(extension, `Extension "${k8sightExtensionId}" must be registered before it can be enabled.`);
    assert(!extension.isBundled, `Cannot change the enabled state of a bundled extension`);

    extension.isEnabled = isEnabled;
  }

  protected async initMain() {
    runInAction(() => {
      this.isLoaded.set(true);
    });

    await this.autoInitExtensions();

    ipcMainHandle(extensionLoaderFromMainChannel, () => [...this.toJSON()]);

    ipcMainOn(extensionLoaderFromRendererChannel, (event, extensions: [K8sightExtensionId, InstalledExtension][]) => {
      this.syncExtensions(extensions);
    });
  }

  protected async initRenderer() {
    const extensionListHandler = (extensions: [K8sightExtensionId, InstalledExtension][]) => {
      runInAction(() => {
        this.isLoaded.set(true);
      });
      this.syncExtensions(extensions);

      const receivedExtensionIds = extensions.map(([k8sightExtensionId]) => k8sightExtensionId);

      // Remove deleted extensions in renderer side only
      this.extensions.forEach((_, k8sightExtensionId) => {
        if (!receivedExtensionIds.includes(k8sightExtensionId)) {
          this.removeExtension(k8sightExtensionId);
        }
      });
    };

    requestExtensionLoaderInitialState().then(extensionListHandler);
    ipcRendererOn(extensionLoaderFromMainChannel, (event, extensions: [K8sightExtensionId, InstalledExtension][]) => {
      extensionListHandler(extensions);
    });
  }

  broadcastExtensions() {
    const channel = ipcRenderer ? extensionLoaderFromRendererChannel : extensionLoaderFromMainChannel;

    broadcastMessage(channel, Array.from(this.extensions));
  }

  syncExtensions(extensions: [K8sightExtensionId, InstalledExtension][]) {
    extensions.forEach(([k8sightExtensionId, extension]) => {
      if (!isEqual(this.extensions.get(k8sightExtensionId), extension)) {
        this.extensions.set(k8sightExtensionId, extension);
      }
    });
  }

  protected async loadBundledExtensions() {
    const bundledExtensions = await Promise.all(
      this.dependencies.bundledExtensions.map(async (extension) => {
        try {
          const K8sightExtensionClass = await extension[this.dependencies.extensionEntryPointName]();

          if (!K8sightExtensionClass) {
            return null;
          }

          const installedExtension: BundledInstalledExtension = {
            absolutePath: "irrelevant",
            id: extension.manifest.name,
            isBundled: true,
            isCompatible: true,
            isEnabled: true,
            manifest: extension.manifest,
            manifestPath: "irrelevant",
          };
          const instance = new K8sightExtensionClass(installedExtension);

          this.dependencies.extensionInstances.set(extension.manifest.name, instance);

          return {
            instance,
            installedExtension,
            activated: instance.activate(),
          } as ExtensionBeingActivated;
        } catch (err) {
          this.dependencies.logger.error(`${logModule}: error loading extension`, { ext: extension, err });

          return null;
        }
      }),
    );

    return bundledExtensions.filter(isDefined);
  }

  protected async loadExtensions(extensions: ExtensionBeingActivated[]): Promise<ExtensionLoading[]> {
    // We first need to wait until each extension's `onActivate` is resolved or rejected,
    // as this might register new catalog categories. Afterwards we can safely .enable the extension.
    await Promise.all(
      extensions.map((extension) =>
        // If extension activation fails, log error
        extension.activated.catch((error) => {
          this.dependencies.logger.error(`${logModule}: activation extension error`, {
            ext: extension.installedExtension,
            error,
          });
        }),
      ),
    );

    extensions.forEach(({ instance }) => {
      const extension = this.dependencies.getExtension(instance);

      extension.register();
    });

    return extensions.map((extension) => {
      const loaded = extension.instance.enable().catch((err) => {
        this.dependencies.logger.error(`${logModule}: failed to enable`, { ext: extension, err });
      });

      return {
        isBundled: extension.installedExtension.isBundled,
        loaded,
      };
    });
  }

  protected async loadUserExtensions(installedExtensions: Map<string, InstalledExtension>) {
    // Steps of the function:
    // 1. require and call .activate for each Extension
    // 2. Wait until every extension's onActivate has been resolved
    // 3. Call .enable for each extension
    // 4. Return ExtensionLoading[]

    return [...installedExtensions.entries()]
      .filter((entry): entry is [string, ExternalInstalledExtension] => !entry[1].isBundled)
      .map(([extId, installedExtension]) => {
        const alreadyInit =
          this.dependencies.extensionInstances.has(extId) ||
          this.nonInstancesByName.has(installedExtension.manifest.name);

        if (installedExtension.isCompatible && installedExtension.isEnabled && !alreadyInit) {
          try {
            const K8sightExtensionClass = this.requireExtension(installedExtension);

            if (!K8sightExtensionClass) {
              this.nonInstancesByName.add(installedExtension.manifest.name);

              return null;
            }

            const instance = new K8sightExtensionClass(installedExtension);

            this.dependencies.extensionInstances.set(extId, instance);

            return {
              instance,
              installedExtension,
              activated: instance.activate(),
            } as ExtensionBeingActivated;
          } catch (err) {
            this.dependencies.logger.error(`${logModule}: error loading extension`, { ext: installedExtension, err });
          }
        } else if (!installedExtension.isEnabled && alreadyInit) {
          this.removeInstance(extId);
        }

        return null;
      })
      .filter(isDefined);
  }

  async autoInitExtensions() {
    this.dependencies.logger.info(`${logModule}: auto initializing extensions`);

    const bundledExtensions = await this.loadBundledExtensions();
    const userExtensions = await this.loadUserExtensions(this.toJSON());
    const loadedExtensions = await this.loadExtensions([...bundledExtensions, ...userExtensions]);

    // Setup reaction to load extensions on JSON changes
    reaction(
      () => this.toJSON(),
      (installedExtensions) => {
        void (async () => {
          const userExtensions = await this.loadUserExtensions(installedExtensions);

          await this.loadExtensions(userExtensions);
        })();
      },
    );

    return loadedExtensions;
  }

  protected requireExtension(extension: ExternalInstalledExtension): K8sightExtensionConstructor | null {
    const extRelativePath = extension.manifest[this.dependencies.extensionEntryPointName];

    if (!extRelativePath) {
      return null;
    }

    const extAbsolutePath = this.dependencies.joinPaths(
      this.dependencies.getDirnameOfPath(extension.manifestPath),
      extRelativePath,
    );

    try {
      return require(/* webpackIgnore: true */ extAbsolutePath).default;
    } catch (error) {
      const message = (error instanceof Error ? error.stack : undefined) || error;

      this.dependencies.logger.error(
        `${logModule}: can't load ${this.dependencies.extensionEntryPointName} for "${extension.manifest.name}": ${message}`,
        { extension },
      );
    }

    return null;
  }

  getExtensionById(extId: K8sightExtensionId) {
    return this.extensions.get(extId);
  }

  getInstanceById(extId: K8sightExtensionId) {
    return this.dependencies.extensionInstances.get(extId);
  }

  toJSON(): Map<K8sightExtensionId, InstalledExtension> {
    return toJS(this.extensions);
  }
}
