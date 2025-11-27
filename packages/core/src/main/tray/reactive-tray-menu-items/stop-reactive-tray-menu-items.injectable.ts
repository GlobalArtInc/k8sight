import { getInjectable } from "@ogre-tools/injectable";
import { onQuitOfBackEndInjectionToken } from "../../start-main-application/runnable-tokens/phases";
import reactiveTrayMenuItemsInjectable from "./reactive-tray-menu-items.injectable";

const stopReactiveTrayMenuItemsInjectable = getInjectable({
  id: "stop-reactive-tray-menu-items",

  instantiate: (di) => ({
    run: () => {
      const reactiveTrayMenuItems = di.inject(reactiveTrayMenuItemsInjectable);

      reactiveTrayMenuItems.stop();

      return undefined;
    },
  }),

  injectionToken: onQuitOfBackEndInjectionToken,
});

export default stopReactiveTrayMenuItemsInjectable;
