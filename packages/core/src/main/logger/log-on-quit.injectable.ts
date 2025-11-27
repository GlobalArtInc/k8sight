import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { onQuitOfBackEndInjectionToken } from "../start-main-application/runnable-tokens/phases";

const logOnQuitOfBackendInjectable = getInjectable({
  id: "log-on-quit-of-backend",
  instantiate: (di) => ({
    run: () => {
      const logger = di.inject(loggerInjectionToken);

      logger.info("Quitting application ...");
    },
  }),
  injectionToken: onQuitOfBackEndInjectionToken,
});

export default logOnQuitOfBackendInjectable;
