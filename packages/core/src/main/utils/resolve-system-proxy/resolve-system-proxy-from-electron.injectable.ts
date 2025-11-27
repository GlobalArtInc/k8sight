import { getInjectable } from "@ogre-tools/injectable";
import withErrorLoggingInjectable from "../../../common/utils/with-error-logging/with-error-logging.injectable";
import resolveSystemProxyWindowInjectable from "./resolve-system-proxy-window.injectable";

const resolveSystemProxyFromElectronInjectable = getInjectable({
  id: "resolve-system-proxy-from-electron",

  instantiate: (di) => {
    const withErrorLoggingFor = di.inject(withErrorLoggingInjectable);
    const withErrorLogging = withErrorLoggingFor(() => "Error resolving proxy");

    return withErrorLogging(async (url: string) => {
      const helperWindow = await di.inject(resolveSystemProxyWindowInjectable);

      return await helperWindow.webContents.session.resolveProxy(url);
    });
  },
});

export default resolveSystemProxyFromElectronInjectable;
