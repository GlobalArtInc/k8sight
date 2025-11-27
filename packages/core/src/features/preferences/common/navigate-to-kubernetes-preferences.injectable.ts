import { getInjectable } from "@ogre-tools/injectable";
import navigateToPreferencesInjectable from "./navigate-to-preferences.injectable";

const navigateToKubernetesPreferencesInjectable = getInjectable({
  id: "navigate-to-kubernetes-preferences",

  instantiate: (di) => {
    const navigateToPreferences = di.inject(navigateToPreferencesInjectable);

    return () => navigateToPreferences("kubernetes");
  },
});

export default navigateToKubernetesPreferencesInjectable;
