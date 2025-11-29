import { getInjectable } from "@ogre-tools/injectable";
import { navigateToUrlInjectionToken } from "../../common/front-end-routing/navigate-to-url-injection-token";
import navigateInjectable from "../start-main-application/k8sight-window/navigate.injectable";

const navigateToUrlInjectable = getInjectable({
  id: "navigate-to-url",

  instantiate: (di) => {
    const navigate = di.inject(navigateInjectable);

    return async (url) => {
      await navigate(url);
    };
  },

  injectionToken: navigateToUrlInjectionToken,
});

export default navigateToUrlInjectable;
