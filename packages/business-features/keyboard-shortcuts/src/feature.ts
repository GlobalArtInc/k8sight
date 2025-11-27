import { getFeature } from "@kubesightapp/feature-core";
import { reactApplicationFeature } from "@kubesightapp/react-application";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

export const keyboardShortcutsFeature = getFeature({
  id: "keyboard-shortcuts",

  register: (di) => {
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [require.context("./", true, /\.injectable\.(ts|tsx)$/)],
    });
  },

  dependencies: [reactApplicationFeature],
});
