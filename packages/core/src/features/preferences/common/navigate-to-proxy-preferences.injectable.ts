import { getInjectable } from "@ogre-tools/injectable";
import navigateToPreferencesInjectable from "./navigate-to-preferences.injectable";

const navigateToProxyPreferencesInjectable = getInjectable({
  id: "navigate-to-proxy-preferences",

  instantiate: (di) => {
    const navigateToPreferences = di.inject(navigateToPreferencesInjectable);

    return () => navigateToPreferences("proxy");
  },
});

export default navigateToProxyPreferencesInjectable;
