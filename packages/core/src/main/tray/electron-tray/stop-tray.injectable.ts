import { getInjectable } from "@ogre-tools/injectable";
import { onQuitOfBackEndInjectionToken } from "../../start-main-application/runnable-tokens/phases";
import stopReactiveTrayMenuItemsInjectable from "../reactive-tray-menu-items/stop-reactive-tray-menu-items.injectable";
import electronTrayInjectable from "./electron-tray.injectable";

const stopTrayInjectable = getInjectable({
  id: "stop-tray",

  instantiate: (di) => ({
    run: () => {
      const electronTray = di.inject(electronTrayInjectable);

      electronTray.stop();

      return undefined;
    },
    runAfter: stopReactiveTrayMenuItemsInjectable,
  }),

  injectionToken: onQuitOfBackEndInjectionToken,
});

export default stopTrayInjectable;
