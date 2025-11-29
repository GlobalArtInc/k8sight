import { getInjectable } from "@ogre-tools/injectable";
import { onQuitOfBackEndInjectionToken } from "../start-main-application/runnable-tokens/phases";
import k8sightProxyInjectable from "./k8sight-proxy.injectable";

const closeK8sightProxyOnQuitInjectable = getInjectable({
  id: "close-k8sight-proxy-on-quit",
  instantiate: (di) => ({
    run: async () => {
      const k8sightProxy = di.inject(k8sightProxyInjectable);

      await k8sightProxy.close();
    },
  }),
  injectionToken: onQuitOfBackEndInjectionToken,
});

export default closeK8sightProxyOnQuitInjectable;
