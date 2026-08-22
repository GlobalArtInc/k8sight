/**
 * The slice of `electron-updater`'s `AppUpdater` this feature drives.
 *
 * It is declared instead of imported because `electron-updater` is a dependency of the `k8sight`
 * app package rather than of core: neither `tsc` nor core's webpack build can resolve it from here,
 * and core's `webpack-node-externals` would try to bundle it. The module is pulled in at runtime
 * with `__non_webpack_require__`, which resolves from the packaged app's own `node_modules` -- the
 * only place it exists, and the only place the updater can do anything anyway.
 */

export interface UpdateInfo {
  version: string;
}

export interface ProgressInfo {
  percent: number;
}

export interface AppUpdaterLogger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}

export interface AppUpdater {
  /** Downloading unasked would spend somebody's tethered connection on a 150 MB installer. */
  autoDownload: boolean;

  /** Applies an already downloaded update on the next quit, so "later" still means "eventually". */
  autoInstallOnAppQuit: boolean;

  /** See `main/updater.injectable.ts` for why this follows the running version's own channel. */
  allowPrerelease: boolean;

  allowDowngrade: boolean;

  logger: AppUpdaterLogger | null;

  on(
    event: "update-available" | "update-not-available" | "update-downloaded",
    listener: (info: UpdateInfo) => void,
  ): AppUpdater;
  on(event: "download-progress", listener: (progress: ProgressInfo) => void): AppUpdater;
  on(event: "error", listener: (error: Error) => void): AppUpdater;

  checkForUpdates(): Promise<unknown>;
  downloadUpdate(): Promise<unknown>;
  quitAndInstall(isSilent?: boolean, isForceRunAfter?: boolean): void;
}

export interface ElectronUpdaterModule {
  autoUpdater: AppUpdater;
}
