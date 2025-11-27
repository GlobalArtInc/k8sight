import { applicationFeature } from "@kubesightapp/application";
import { getFeature } from "@kubesightapp/feature-core";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

export const messagingFeature = getFeature({
  id: "messaging",

  dependencies: [applicationFeature],

  register: (di) => {
    autoRegister({
      di,
      targetModule: module,

      getRequireContexts: () => [require.context("./", true, /\.injectable\.(ts|tsx)$/)],
    });
  },
});
