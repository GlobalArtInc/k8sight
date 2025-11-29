import { getInjectable } from "@ogre-tools/injectable";
import { runInAction } from "mobx";
import k8sightProtocolRouterMainInjectable from "../../../protocol-handler/k8sight-protocol-router-main/k8sight-protocol-router-main.injectable";
import { afterQuitOfFrontEndInjectionToken } from "../../runnable-tokens/phases";

const flagRendererAsNotLoadedInjectable = getInjectable({
  id: "stop-deep-linking",

  instantiate: (di) => ({
    run: () => {
      const k8sightProtocolRouterMain = di.inject(k8sightProtocolRouterMainInjectable);

      runInAction(() => {
        // Todo: remove this kludge which enables out-of-place temporal dependency.
        k8sightProtocolRouterMain.rendererLoaded.set(false);
      });

      return undefined;
    },
  }),

  injectionToken: afterQuitOfFrontEndInjectionToken,
});

export default flagRendererAsNotLoadedInjectable;
