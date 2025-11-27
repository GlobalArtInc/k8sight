import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import forceAppExitInjectable from "../features/force-app-exit.injectable";
import powerMonitorInjectable from "../features/power-monitor.injectable";

const setupDeviceShutdownInjectable = getInjectable({
  id: "setup-device-shutdown",

  instantiate: (di) => ({
    run: () => {
      const powerMonitor = di.inject(powerMonitorInjectable);
      const forceAppExit = di.inject(forceAppExitInjectable);

      powerMonitor.on("shutdown", forceAppExit);
    },
  }),

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default setupDeviceShutdownInjectable;
