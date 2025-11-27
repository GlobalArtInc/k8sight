import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { nodeEnvInjectionToken } from "../../../common/vars/node-env-injection-token";

const setupDeveloperToolsInDevelopmentEnvironmentInjectable = getInjectable({
  id: "setup-developer-tools-in-development-environment",

  instantiate: (di) => ({
    run: () => {
      const logger = di.inject(loggerInjectionToken);
      const nodeEnv = di.inject(nodeEnvInjectionToken);

      if (nodeEnv !== "development") {
        return;
      }

      logger.info("🤓 Installing developer tools");

      void (async () => {
        try {
          const { default: devToolsInstaller, REACT_DEVELOPER_TOOLS } = await import("electron-devtools-installer");

          const name = await devToolsInstaller([REACT_DEVELOPER_TOOLS]);

          logger.info(`[DEVTOOLS-INSTALLER]: installed ${name}`);
        } catch (error) {
          logger.error(`[DEVTOOLS-INSTALLER]: failed`, { error });
        }
      })();
    },
  }),

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default setupDeveloperToolsInDevelopmentEnvironmentInjectable;
