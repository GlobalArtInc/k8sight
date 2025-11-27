import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { getInjectable } from "@ogre-tools/injectable";
import { enableMapSet, setAutoFreeze } from "immer";

const setupImmerInjectable = getInjectable({
  id: "setup-immer",

  instantiate: () => ({
    run: () => {
      // Docs: https://immerjs.github.io/immer/
      // Required in `utils/storage-helper.ts`
      setAutoFreeze(false); // allow to merge mobx observables
      enableMapSet(); // allow to merge maps and sets

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupImmerInjectable;
