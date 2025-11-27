import "@kubesightapp/core/styles";
import "@kubesightapp/button/styles";
import "@kubesightapp/error-boundary/styles";
import "@kubesightapp/tooltip/styles";
import "@kubesightapp/resizing-anchor/styles";
import "@kubesightapp/icon/styles";
import "@kubesightapp/animate/styles";
import "@kubesightapp/notifications/styles";
import "@kubesightapp/spinner/styles";

import { animateFeature } from "@kubesightapp/animate";
import { applicationFeature, startApplicationInjectionToken } from "@kubesightapp/application";
import { clusterSidebarFeature } from "@kubesightapp/cluster-sidebar";
import {
  commonExtensionApi as Common,
  metricsFeature,
  rendererExtensionApi as Renderer,
  registerLensCore,
} from "@kubesightapp/core/renderer";
import { registerFeature } from "@kubesightapp/feature-core";
import { keyboardShortcutsFeature } from "@kubesightapp/keyboard-shortcuts";
import { kubeApiSpecificsFeature } from "@kubesightapp/kube-api-specifics";
import { loggerFeature } from "@kubesightapp/logger";
import { messagingFeatureForRenderer } from "@kubesightapp/messaging-for-renderer";
import { notificationsFeature } from "@kubesightapp/notifications";
import { randomFeature } from "@kubesightapp/random";
import { reactApplicationFeature } from "@kubesightapp/react-application";
import { routingFeature } from "@kubesightapp/routing";
import { createContainer } from "@ogre-tools/injectable";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";
import { registerMobX } from "@ogre-tools/injectable-extension-for-mobx";
import { registerInjectableReact } from "@ogre-tools/injectable-react";
import { runInAction } from "mobx";

const environment = "renderer";

const di = createContainer(environment, {
  detectCycles: false,
});

runInAction(() => {
  registerMobX(di);
  registerInjectableReact(di);
  registerLensCore(di, environment);

  registerFeature(di, loggerFeature);

  registerFeature(
    di,
    applicationFeature,
    messagingFeatureForRenderer,
    keyboardShortcutsFeature,
    reactApplicationFeature,
    routingFeature,
    metricsFeature,
    animateFeature,
    clusterSidebarFeature,
    randomFeature,
    kubeApiSpecificsFeature,
    notificationsFeature,
  );

  autoRegister({
    di,
    targetModule: module,
    getRequireContexts: () => [
      require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
      require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
    ],
  });
});

const startApplication = di.inject(startApplicationInjectionToken);

startApplication();

export {
  Mobx,
  MobxReact,
  React,
  ReactDOM,
  ReactJsxRuntime,
  ReactRouter,
  ReactRouterDom,
} from "@kubesightapp/core/renderer";

export const LensExtensions = {
  Renderer,
  Common,
};
