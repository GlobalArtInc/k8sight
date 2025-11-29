import { beforeApplicationIsLoadingInjectionToken } from "@kubesightapp/application";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { Agent } from "https";
import k8sightProxyCertificateInjectable from "../../../common/certificate/k8sight-proxy-certificate.injectable";
import nodeFetchInjectable from "../../../common/fetch/node-fetch.injectable";
import isWindowsInjectable from "../../../common/vars/is-windows.injectable";
import { buildVersionInitializable } from "../../../features/vars/build-version/common/token";
import { buildVersionInitializationInjectable } from "../../../features/vars/build-version/main/init.injectable";
import forceAppExitInjectable from "../../electron-app/features/force-app-exit.injectable";
import showErrorPopupInjectable from "../../electron-app/features/show-error-popup.injectable";
import k8sightProxyInjectable from "../../k8sight-proxy/k8sight-proxy.injectable";
import k8sightProxyPortInjectable from "../../k8sight-proxy/k8sight-proxy-port.injectable";

const setupK8sightProxyInjectable = getInjectable({
  id: "setup-k8sight-proxy",

  instantiate: (di) => ({
    run: async () => {
      const k8sightProxy = di.inject(k8sightProxyInjectable);
      const forceAppExit = di.inject(forceAppExitInjectable);
      const logger = di.inject(loggerInjectionToken);
      const k8sightProxyPort = di.inject(k8sightProxyPortInjectable);
      const isWindows = di.inject(isWindowsInjectable);
      const showErrorPopup = di.inject(showErrorPopupInjectable);
      const buildVersion = di.inject(buildVersionInitializable.stateToken);
      const k8sightProxyCertificate = di.inject(k8sightProxyCertificateInjectable);
      const fetch = di.inject(nodeFetchInjectable);

      try {
        logger.info("🔌 Starting K8Sight Proxy");
        await k8sightProxy.listen(); // k8sightProxy.port available
      } catch (error: any) {
        showErrorPopup("K8Sight Error", `Could not start proxy: ${error?.message || "unknown error"}`);

        return forceAppExit();
      }

      // test proxy connection
      try {
        logger.info("🔎 Testing K8Sight Proxy connection ...");
        const versionResponse = await fetch(`https://127.0.0.1:${k8sightProxyPort.get()}/version`, {
          agent: new Agent({
            ca: k8sightProxyCertificate.get()?.cert,
          }),
        });

        const { version: versionFromProxy } = (await versionResponse.json()) as { version: string };

        if (buildVersion !== versionFromProxy) {
          logger.error("Proxy server responded with invalid response");

          return forceAppExit();
        }

        logger.info("⚡ K8Sight Proxy connection OK");
      } catch (error) {
        logger.error(`🛑 K8Sight Proxy: failed connection test: ${error}`);

        const hostsPath = isWindows ? "C:\\windows\\system32\\drivers\\etc\\hosts" : "/etc/hosts";
        const message = [
          `Failed connection test: ${error}`,
          "Check to make sure that no other versions of K8Sight are running",
          `Check ${hostsPath} to make sure that it is clean and that the localhost loopback is at the top and set to 127.0.0.1`,
          "If you have HTTP_PROXY or http_proxy set in your environment, make sure that the localhost and the ipv4 loopback address 127.0.0.1 are added to the NO_PROXY environment variable.",
        ];

        showErrorPopup("K8Sight Proxy Error", message.join("\n\n"));

        return forceAppExit();
      }
    },
    runAfter: buildVersionInitializationInjectable,
  }),

  causesSideEffects: true,

  injectionToken: beforeApplicationIsLoadingInjectionToken,
});

export default setupK8sightProxyInjectable;
