import { applicationFeature } from "@kubesightapp/application";
import { getFeature } from "@kubesightapp/feature-core";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

export const reactApplicationFeature = getFeature({
  id: "react-application",

  register: (di) => {
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [require.context("./", true, /\.injectable\.(ts|tsx)$/)],
    });
  },

  dependencies: [applicationFeature],
});
