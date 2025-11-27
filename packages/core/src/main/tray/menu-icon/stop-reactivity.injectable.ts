import { getInjectable } from "@ogre-tools/injectable";
import { onQuitOfBackEndInjectionToken } from "../../start-main-application/runnable-tokens/phases";
import reactiveTrayMenuIconInjectable from "./reactive.injectable";

const stopReactiveTrayMenuIconInjectable = getInjectable({
  id: "stop-reactive-tray-menu-icon",

  instantiate: (di) => ({
    run: () => {
      const reactiveTrayMenuIcon = di.inject(reactiveTrayMenuIconInjectable);

      reactiveTrayMenuIcon.stop();

      return undefined;
    },
  }),

  injectionToken: onQuitOfBackEndInjectionToken,
});

export default stopReactiveTrayMenuIconInjectable;
