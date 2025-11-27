import { getInjectable } from "@ogre-tools/injectable";
import navigateToPreferencesInjectable from "./navigate-to-preferences.injectable";

const navigateToApplicationPreferencesInjectable = getInjectable({
  id: "navigate-to-application-preferences",

  instantiate: (di) => {
    const navigateToPreferences = di.inject(navigateToPreferencesInjectable);

    return () => navigateToPreferences("app");
  },
});

export default navigateToApplicationPreferencesInjectable;
