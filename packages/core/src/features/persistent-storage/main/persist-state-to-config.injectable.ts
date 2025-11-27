import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { persistStateToConfigInjectionToken } from "../common/save-to-file";

const persistStateToConfigInjectable = getInjectable({
  id: "persist-state-to-config",
  instantiate: (di) => {
    const logger = di.inject(loggerInjectionToken);

    return (config, state) => {
      logger.info(`[BASE-STORE]: saving ${config.path}...`);

      for (const [key, value] of Object.entries(state)) {
        config.set(key, value);
      }
    };
  },
  injectionToken: persistStateToConfigInjectionToken,
});

export default persistStateToConfigInjectable;
