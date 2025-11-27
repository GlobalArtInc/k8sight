import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import userPreferencesStateInjectable from "../../../features/user-preferences/common/state.injectable";
import electronTrayInjectable from "./electron-tray.injectable";

const startTrayInjectable = getInjectable({
  id: "start-tray",

  instantiate: (di) => ({
    run: () => {
      const electronTray = di.inject(electronTrayInjectable);
      const userPreferencesState = di.inject(userPreferencesStateInjectable);
      const showTray = userPreferencesState.showTrayIcon;

      if (!showTray) {
        electronTray.stop();
        return;
      }

      electronTray.start();
    },
  }),

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default startTrayInjectable;
