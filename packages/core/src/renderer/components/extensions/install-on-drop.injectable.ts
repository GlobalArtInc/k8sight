import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import attemptInstallsInjectable from "./attempt-installs.injectable";

export type InstallOnDrop = (files: File[]) => Promise<void>;

const installOnDropInjectable = getInjectable({
  id: "install-on-drop",

  instantiate: (di): InstallOnDrop => {
    const attemptInstalls = di.inject(attemptInstallsInjectable);
    const logger = di.inject(loggerInjectionToken);

    return (files) => {
      logger.info("Install from D&D");

      return attemptInstalls(files.map(({ path }) => path));
    };
  },
});

export default installOnDropInjectable;
