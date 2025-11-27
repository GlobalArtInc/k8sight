import { getInjectable } from "@ogre-tools/injectable";
import navigateToPreferencesInjectable from "./navigate-to-preferences.injectable";

const navigateToTerminalPreferencesInjectable = getInjectable({
  id: "navigate-to-terminal-preferences",

  instantiate: (di) => {
    const navigateToPreferences = di.inject(navigateToPreferencesInjectable);

    return () => navigateToPreferences("terminal");
  },
});

export default navigateToTerminalPreferencesInjectable;
