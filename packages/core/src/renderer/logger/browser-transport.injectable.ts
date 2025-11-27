import { loggerTransportInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import BrowserConsole from "winston-transport-browserconsole";

const browserLoggerTransportInjectable = getInjectable({
  id: "browser-logger-transport",
  instantiate: () => new BrowserConsole(),
  injectionToken: loggerTransportInjectionToken,
  decorable: false,
});

export default browserLoggerTransportInjectable;
