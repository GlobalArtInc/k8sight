import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import extensionDiscoveryInjectable from "../../../extensions/extension-discovery/extension-discovery.injectable";
import extensionLoaderInjectable from "../../../extensions/extension-loader/extension-loader.injectable";
import setupShellInjectable from "../../../features/shell-sync/main/setup-shell.injectable";
import showErrorPopupInjectable from "../../electron-app/features/show-error-popup.injectable";

const initializeExtensionsInjectable = getInjectable({
  id: "initialize-extensions",

  instantiate: (di) => ({
    run: async () => {
      const logger = di.inject(loggerInjectionToken);
      const extensionDiscovery = di.inject(extensionDiscoveryInjectable);
      const extensionLoader = di.inject(extensionLoaderInjectable);
      const showErrorPopup = di.inject(showErrorPopupInjectable);

      logger.info("🧩 Initializing extensions");

      await extensionDiscovery.init();

      await extensionLoader.init();

      try {
        const extensions = await extensionDiscovery.load();

        // Start watching after bundled extensions are loaded
        extensionDiscovery.watchExtensions();

        // Subscribe to extensions that are copied or deleted to/from the extensions folder
        extensionDiscovery.events
          .on("add", (extension) => {
            extensionLoader.addExtension(extension);
          })
          .on("remove", (k8sightExtensionId) => {
            extensionLoader.removeExtension(k8sightExtensionId);
          });

        extensionLoader.initExtensions(extensions);
      } catch (error: any) {
        showErrorPopup("K8Sight Error", `Could not load extensions${error?.message ? `: ${error.message}` : ""}`);

        console.error(error);
        console.trace();
      }
    },
    runAfter: setupShellInjectable,
  }),

  causesSideEffects: true,

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default initializeExtensionsInjectable;
