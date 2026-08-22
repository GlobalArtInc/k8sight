import { getInjectable } from "@ogre-tools/injectable";

/**
 * Set by the AppImage runtime to the path of the image the app was launched from.
 *
 * It is the only reliable way to tell an AppImage apart from a deb or rpm install of the same
 * build, and electron-updater's `AppImageUpdater` refuses to run without it.
 */
const isAppImagePackageInjectable = getInjectable({
  id: "is-app-image-package",
  instantiate: () => Boolean(process.env.APPIMAGE),
  causesSideEffects: true,
});

export default isAppImagePackageInjectable;
