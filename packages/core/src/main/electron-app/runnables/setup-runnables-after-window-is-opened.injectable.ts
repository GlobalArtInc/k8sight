import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { runManyFor } from "@kubesightapp/run-many";
import { getInjectable } from "@ogre-tools/injectable";
import { afterWindowIsOpenedInjectionToken } from "../../start-main-application/runnable-tokens/phases";
import electronAppInjectable from "../electron-app.injectable";
import setupContextMenuHandlerInjectable from "./setup-context-menu-handler.injectable";
import setupPasteHandlerInjectable from "./setup-paste-handler.injectable";

const setupRunnablesAfterWindowIsOpenedInjectable = getInjectable({
  id: "setup-runnables-after-window-is-opened",

  instantiate: (di) => ({
    run: () => {
      const afterWindowIsOpened = runManyFor(di)(afterWindowIsOpenedInjectionToken);
      const app = di.inject(electronAppInjectable);
      const setupPasteHandler = di.inject(setupPasteHandlerInjectable);
      const setupContextMenuHandler = di.inject(setupContextMenuHandlerInjectable);

      app.on("browser-window-created", (_, win) => {
        afterWindowIsOpened();
        setupPasteHandler(win);
        setupContextMenuHandler(win);
      });

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupRunnablesAfterWindowIsOpenedInjectable;
