import { getInjectable } from "@ogre-tools/injectable";
import { onQuitOfBackEndInjectionToken } from "../../../main/start-main-application/runnable-tokens/phases";
import applicationMenuReactivityInjectable from "./application-menu-reactivity.injectable";

const stopApplicationMenuInjectable = getInjectable({
  id: "stop-application-menu",

  instantiate: (di) => ({
    run: () => {
      const applicationMenu = di.inject(applicationMenuReactivityInjectable);

      applicationMenu.stop();

      return undefined;
    },
  }),

  injectionToken: onQuitOfBackEndInjectionToken,
});

export default stopApplicationMenuInjectable;
