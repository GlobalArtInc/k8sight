import { getInjectable } from "@ogre-tools/injectable";
import k8sightProtocolRouterMainInjectable from "../../protocol-handler/k8sight-protocol-router-main/k8sight-protocol-router-main.injectable";
import { onQuitOfBackEndInjectionToken } from "../../start-main-application/runnable-tokens/phases";

const cleanUpDeepLinkingInjectable = getInjectable({
  id: "clean-up-deep-linking",

  instantiate: (di) => ({
    run: () => {
      const k8sightProtocolRouterMain = di.inject(k8sightProtocolRouterMainInjectable);

      k8sightProtocolRouterMain.cleanup();

      return undefined;
    },
  }),

  injectionToken: onQuitOfBackEndInjectionToken,
});

export default cleanUpDeepLinkingInjectable;
