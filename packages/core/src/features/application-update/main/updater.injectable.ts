import { loggerInjectionToken } from "@kubesightapp/logger";
import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import * as semver from "semver";
import isLinuxInjectable from "../../../common/vars/is-linux.injectable";
import isMacInjectable from "../../../common/vars/is-mac.injectable";
import isWindowsInjectable from "../../../common/vars/is-windows.injectable";
import electronAppInjectable from "../../../main/electron-app/electron-app.injectable";
import isAutoUpdatingInjectable from "../../../main/electron-app/features/is-auto-updating.injectable";
import { buildVersionInitializable } from "../../vars/build-version/common/token";
import { applicationUpdateStateChangedChannel } from "../common/channels";
import isAppImagePackageInjectable from "./is-app-image-package.injectable";

import type { ApplicationUpdateState } from "../common/channels";
import type { AppUpdater, ElectronUpdaterModule } from "./app-updater";

export interface ApplicationUpdater {
  readonly state: ApplicationUpdateState;
  check: () => Promise<void>;
  download: () => Promise<void>;
  install: () => void;
}

const logPrefix = "[APPLICATION-UPDATE]:";

const applicationUpdaterInjectable = getInjectable({
  id: "application-updater",

  instantiate: (di): ApplicationUpdater => {
    const logger = di.inject(loggerInjectionToken);
    const app = di.inject(electronAppInjectable);
    const isWindows = di.inject(isWindowsInjectable);
    const isLinux = di.inject(isLinuxInjectable);
    const isMac = di.inject(isMacInjectable);
    const isAppImage = di.inject(isAppImagePackageInjectable);
    const isAutoUpdating = di.inject(isAutoUpdatingInjectable);
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);

    /*
     * Which builds can actually swap themselves out, decided up front so the renderer never offers
     * an action that cannot finish:
     *
     * - Windows NSIS can, signed or not. electron-updater only checks a downloaded installer's
     *   publisher against the running app's, and an unsigned app carries no publisher to check
     *   against, so that step is skipped and the sha512 in `latest.yml`, fetched over HTTPS from
     *   the release, is what the update rests on. An msi install cannot be told apart from here and
     *   would end up with the NSIS installer beside it -- but msi is a managed-deployment format,
     *   and whoever deployed it is who updates it.
     * - Linux AppImage can, because it rewrites the single file it runs from. deb and rpm belong to
     *   the system package manager -- the app has no write access to /opt and no business there.
     * - macOS cannot, twice over: Squirrel.Mac installs from a `zip` artifact this repo does not
     *   build, and it refuses to touch an app bundle that is not signed, which these builds are not
     *   unless the Apple secrets are configured on the runner.
     * - A development run has no `app-update.yml` at all.
     */
    const canInstall = app.isPackaged && (isWindows || (isLinux && isAppImage));

    let state: ApplicationUpdateState = { phase: "idle", canInstall };

    const setState = (patch: Partial<ApplicationUpdateState>) => {
      state = { ...state, ...patch };

      sendMessageToChannel(applicationUpdateStateChangedChannel, state);
    };

    let updater: AppUpdater | undefined;
    let updaterIsUnavailable = false;

    const getUpdater = () => {
      if (updater || updaterIsUnavailable) {
        return updater;
      }

      updaterIsUnavailable = true;

      // Unpackaged, `electron-updater` has no metadata to read and throws on the first check.
      if (!app.isPackaged) {
        logger.debug(`${logPrefix} not checking for updates: the app is not packaged`);

        return undefined;
      }

      /*
       * macOS is not merely unable to install -- there is nothing for it to read. electron-builder
       * only writes `latest-mac.yml` for a `zip` target, and this repo ships dmg and pkg, so a
       * check would be a guaranteed 404 every few hours. Turning macOS on means adding the `zip`
       * target in `k8sight/electron-builder.yml`, publishing the metadata from
       * `.github/workflows/release.yaml`, and signing the app.
       */
      if (isMac) {
        logger.debug(`${logPrefix} not checking for updates: macOS builds carry no update metadata`);

        return undefined;
      }

      try {
        const { autoUpdater } = __non_webpack_require__("electron-updater") as ElectronUpdaterModule;
        const currentVersion = di.inject(buildVersionInitializable.stateToken);

        autoUpdater.logger = {
          info: (message) => logger.info(`${logPrefix} ${message}`),
          warn: (message) => logger.warn(`${logPrefix} ${message}`),
          error: (message) => logger.error(`${logPrefix} ${message}`),
          debug: (message) => logger.debug(`${logPrefix} ${message}`),
        };

        // The user is told first and downloads on their own say-so; see `autoDownload` in app-updater.ts.
        autoUpdater.autoDownload = false;

        autoUpdater.autoInstallOnAppQuit = canInstall;
        autoUpdater.allowDowngrade = false;

        /*
         * Follow the channel the running build is already on. Every release so far is a semver
         * prerelease (`1.0.0-1`), and electron-updater skips those by default, so without this the
         * feature would find nothing at all today. Once a plain `1.0.0` ships, a user on it stops
         * being offered prereleases -- which is the point: whoever installed a prerelease asked to
         * stay ahead, and whoever installed a stable build did not.
         */
        autoUpdater.allowPrerelease = semver.prerelease(currentVersion) !== null;

        autoUpdater.on("update-available", (info) => {
          logger.info(`${logPrefix} ${info.version} is available`);
          setState({ phase: "available", version: info.version, downloadedPercent: undefined });
        });

        autoUpdater.on("update-not-available", () => {
          setState({ phase: "idle", version: undefined, downloadedPercent: undefined });
        });

        autoUpdater.on("download-progress", (progress) => {
          const downloadedPercent = Math.floor(progress.percent);

          // One message per whole percent, not per chunk.
          if (downloadedPercent !== state.downloadedPercent) {
            setState({ phase: "downloading", downloadedPercent });
          }
        });

        autoUpdater.on("update-downloaded", (info) => {
          setState({ phase: "downloaded", version: info.version, downloadedPercent: 100 });
        });

        autoUpdater.on("error", (error) => {
          logger.error(`${logPrefix} ${error}`);

          /*
           * Only surface a failure the user is waiting on. A background check that could not reach
           * GitHub lands here too, and `check` has already put the state back to idle by then.
           */
          if (state.phase === "downloading") {
            setState({ phase: "failed" });
          }
        });

        updater = autoUpdater;
        updaterIsUnavailable = false;
      } catch (error) {
        logger.warn(`${logPrefix} could not load electron-updater: ${error}`);
      }

      return updater;
    };

    return {
      get state() {
        return state;
      },

      check: async () => {
        const appUpdater = getUpdater();

        // Nothing to learn from a check while an answer is already being acted on.
        if (!appUpdater || state.phase === "downloading" || state.phase === "downloaded") {
          return;
        }

        setState({ phase: "checking" });

        try {
          await appUpdater.checkForUpdates();
        } catch (error) {
          logger.warn(`${logPrefix} check failed: ${error}`);
        }

        // `update-available` / `update-not-available` have moved the state on if the check landed.
        if (state.phase === "checking") {
          setState({ phase: "idle" });
        }
      },

      download: async () => {
        const appUpdater = getUpdater();

        if (!appUpdater || !canInstall || (state.phase !== "available" && state.phase !== "failed")) {
          return;
        }

        setState({ phase: "downloading", downloadedPercent: 0 });

        try {
          await appUpdater.downloadUpdate();
        } catch (error) {
          logger.error(`${logPrefix} download failed: ${error}`);
          setState({ phase: "failed" });
        }
      },

      install: () => {
        const appUpdater = getUpdater();

        if (!appUpdater || !canInstall || state.phase !== "downloaded") {
          return;
        }

        /*
         * Without this the app hides in the tray on "window-all-closed" instead of quitting, and
         * the installer waits forever for a process that never exits.
         */
        isAutoUpdating.setAsUpdating();

        appUpdater.quitAndInstall();
      },
    };
  },

  // Loads electron-updater, which reaches for the packaged app's metadata and the network.
  causesSideEffects: true,
});

export default applicationUpdaterInjectable;
