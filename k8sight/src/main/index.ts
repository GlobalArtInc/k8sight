import { applicationFeature, startApplicationInjectionToken } from "@kubesightapp/application";
import { applicationFeatureForElectronMain } from "@kubesightapp/application-for-electron-main";
import { commonExtensionApi as Common, mainExtensionApi as Main, registerLensCore } from "@kubesightapp/core/main";
import { registerFeature } from "@kubesightapp/feature-core";
import { kubeApiSpecificsFeature } from "@kubesightapp/kube-api-specifics";
import { loggerFeature } from "@kubesightapp/logger";
import { messagingFeatureForMain } from "@kubesightapp/messaging-for-main";
import { prometheusFeature } from "@kubesightapp/prometheus";
import { randomFeature } from "@kubesightapp/random";
import { createContainer } from "@ogre-tools/injectable";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";
import { registerMobX } from "@ogre-tools/injectable-extension-for-mobx";
import { runInAction } from "mobx";

const environment = "main";

const di = createContainer(environment, {
  detectCycles: false,
});

registerMobX(di);

runInAction(() => {
  registerLensCore(di, environment);

  registerFeature(
    di,
    loggerFeature,
    prometheusFeature,
    applicationFeature,
    applicationFeatureForElectronMain,
    messagingFeatureForMain,
    randomFeature,
    kubeApiSpecificsFeature,
  );

  try {
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [
        require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
        require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
      ],
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

const startApplication = di.inject(startApplicationInjectionToken);

startApplication().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {
  Mobx,
  Pty,
} from "@kubesightapp/core/main";

export const LensExtensions = {
  Main,
  Common,
};
