import { getInjectable } from "@ogre-tools/injectable";
import { applicationWindowInjectionToken } from "./application-window/application-window-injection-token";

const getVisibleWindowsInjectable = getInjectable({
  id: "get-visible-windows",

  instantiate: (di) => () => di.injectMany(applicationWindowInjectionToken).filter((window) => window.isVisible),
});

export default getVisibleWindowsInjectable;
