import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { runManyFor } from "@kubesightapp/run-many";
import { getInjectable } from "@ogre-tools/injectable";
import { once } from "lodash";
import { onQuitOfBackEndInjectionToken } from "../../start-main-application/runnable-tokens/phases";
import electronAppInjectable from "../electron-app.injectable";

const setupCleanupOfBackendOnQuitInjectable = getInjectable({
  id: "setup-cleanup-of-backend-on-quit",

  instantiate: (di) => ({
    run: () => {
      const runMany = runManyFor(di);
      const runOnQuitOfBackEnd = runMany(onQuitOfBackEndInjectionToken);
      const app = di.inject(electronAppInjectable);

      const doAsyncQuit = once(
        () =>
          void (async () => {
            try {
              await runOnQuitOfBackEnd();
              app.exit(0);
            } catch (error) {
              console.error("A beforeQuitOfBackEnd failed!!!!", error);
              app.exit(1);
            }
          })(),
      );

      app.on("will-quit", (event) => {
        event.preventDefault();
        doAsyncQuit();
      });

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupCleanupOfBackendOnQuitInjectable;
