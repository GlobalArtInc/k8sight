import { loggerInjectionToken } from "@kubesightapp/logger";
import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import { beforeFrameStartsSecondInjectionToken } from "../before-frame-starts/tokens";

const setupLoggingForNavigationInjectable = getInjectable({
  id: "setup-logging-for-navigation",
  instantiate: (di) => ({
    run: () => {
      const logger = di.inject(loggerInjectionToken);
      const observableHistory = di.inject(observableHistoryInjectionToken);

      observableHistory.listen((location, action) => {
        const isClusterView = !process.isMainFrame;
        const domain = global.location.href;

        logger.debug(`[NAVIGATION]: ${action}-ing. Current is now:`, {
          isClusterView,
          domain,
          location,
        });
      });
    },
  }),
  injectionToken: beforeFrameStartsSecondInjectionToken,
});

export default setupLoggingForNavigationInjectable;
