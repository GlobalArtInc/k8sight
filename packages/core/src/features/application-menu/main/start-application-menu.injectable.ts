import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import applicationMenuReactivityInjectable from "./application-menu-reactivity.injectable";

const startApplicationMenuInjectable = getInjectable({
  id: "start-application-menu",

  instantiate: (di) => ({
    run: () => {
      const applicationMenu = di.inject(applicationMenuReactivityInjectable);

      applicationMenu.start();
    },
  }),

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default startApplicationMenuInjectable;
