import { getInjectable } from "@ogre-tools/injectable";
import { createLogger, format } from "winston";
import { loggerTransportInjectionToken } from "./transports";

export const winstonLoggerInjectable = getInjectable({
  id: "winston-logger",
  instantiate: (di) =>
    createLogger({
      format: format.combine(format.splat(), format.simple(), format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" })),
      transports: di.injectMany(loggerTransportInjectionToken),
    }),
});
