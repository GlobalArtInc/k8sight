import { getInjectable } from "@ogre-tools/injectable";
import { runInAction } from "mobx";
import k8sightProtocolRouterMainInjectable from "../../../protocol-handler/k8sight-protocol-router-main/k8sight-protocol-router-main.injectable";
import { afterRootFrameIsReadyInjectionToken } from "../../runnable-tokens/phases";

const flagRendererAsLoadedInjectable = getInjectable({
  id: "flag-renderer-as-loaded",

  instantiate: (di) => ({
    run: () => {
      const k8sightProtocolRouterMain = di.inject(k8sightProtocolRouterMainInjectable);

      runInAction(() => {
        // Todo: remove this kludge which enables out-of-place temporal dependency.
        k8sightProtocolRouterMain.rendererLoaded.set(true);
      });
    },
  }),

  injectionToken: afterRootFrameIsReadyInjectionToken,
});

export default flagRendererAsLoadedInjectable;
