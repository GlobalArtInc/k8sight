import { beforeElectronIsReadyInjectionToken } from "@kubesightapp/application-for-electron-main";
import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../../electron-app/electron-app.injectable";

const setupHostnamesInjectable = getInjectable({
  id: "setup-hostnames",

  instantiate: (di) => ({
    run: () => {
      const app = di.inject(electronAppInjectable);

      app.commandLine.appendSwitch(
        "host-rules",
        [
          "MAP localhost 127.0.0.1",
          "MAP renderer.k8sight.app 127.0.0.1",
          "MAP *.renderer.k8sight.app 127.0.0.1",
        ].join(),
      );

      return undefined;
    },
  }),

  injectionToken: beforeElectronIsReadyInjectionToken,
});

export default setupHostnamesInjectable;
