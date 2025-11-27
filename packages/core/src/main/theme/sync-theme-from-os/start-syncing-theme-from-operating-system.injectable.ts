import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import syncThemeFromOperatingSystemInjectable from "../../electron-app/features/sync-theme-from-operating-system.injectable";

const startSyncingThemeFromOperatingSystemInjectable = getInjectable({
  id: "start-syncing-theme-from-operating-system",

  instantiate: (di) => ({
    run: () => {
      const syncTheme = di.inject(syncThemeFromOperatingSystemInjectable);

      syncTheme.start();
    },
  }),

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default startSyncingThemeFromOperatingSystemInjectable;
