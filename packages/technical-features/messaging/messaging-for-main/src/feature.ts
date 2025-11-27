import { getFeature } from "@kubesightapp/feature-core";
import { messagingFeature } from "@kubesightapp/messaging";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

export const messagingFeatureForMain = getFeature({
  id: "messaging-for-main",

  register: (di) => {
    autoRegister({
      di,
      targetModule: module,

      getRequireContexts: () => [require.context("./", true, /\.injectable\.(ts|tsx)$/)],
    });
  },

  dependencies: [messagingFeature],
});
