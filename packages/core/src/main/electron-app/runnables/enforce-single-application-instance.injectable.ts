import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { getInjectable } from "@ogre-tools/injectable";
import forceAppExitInjectable from "../features/force-app-exit.injectable";
import requestSingleInstanceLockInjectable from "../features/request-single-instance-lock.injectable";

const enforceSingleApplicationInstanceInjectable = getInjectable({
  id: "enforce-single-application-instance",

  instantiate: (di) => ({
    run: () => {
      const requestSingleInstanceLock = di.inject(requestSingleInstanceLockInjectable);
      const forceAppExit = di.inject(forceAppExitInjectable);

      if (!requestSingleInstanceLock()) {
        forceAppExit();
      }

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default enforceSingleApplicationInstanceInjectable;
