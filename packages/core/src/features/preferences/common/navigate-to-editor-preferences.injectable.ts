import { getInjectable } from "@ogre-tools/injectable";
import navigateToPreferencesInjectable from "./navigate-to-preferences.injectable";

const navigateToEditorPreferencesInjectable = getInjectable({
  id: "navigate-to-editor-preferences",

  instantiate: (di) => {
    const navigateToPreferences = di.inject(navigateToPreferencesInjectable);

    return () => navigateToPreferences("editor");
  },
});

export default navigateToEditorPreferencesInjectable;
