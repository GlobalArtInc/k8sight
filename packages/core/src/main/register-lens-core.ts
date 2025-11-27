import { setLegacyGlobalDiForExtensionApi } from "@kubesightapp/legacy-global-di";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";
import { runInAction } from "mobx";

import type { Environments } from "@kubesightapp/legacy-global-di";

import type { DiContainer } from "@ogre-tools/injectable";

export function registerLensCore(di: DiContainer, environment: Environments) {
  setLegacyGlobalDiForExtensionApi(di, environment);

  runInAction(() => {
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [
        require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
        require.context("../extensions", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
        require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
        require.context("../features", true, CONTEXT_MATCHER_FOR_FEATURES),
      ],
    });
  });
}
