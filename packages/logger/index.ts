export { loggerFeature } from "./src/feature";
/** @deprecated Use specific injectionToken, eg. logErrorInjectionToken */
export {
  logDebugInjectionToken,
  logErrorInjectionToken,
  loggerInjectionToken,
  logInfoInjectionToken,
  logSillyInjectionToken,
  logWarningInjectionToken,
} from "./src/logger.injectable";
/** @deprecated Use specific injectionToken, eg. logErrorInjectionToken */
export { prefixedLoggerInjectable } from "./src/prefixed-logger.injectable";
export { loggerTransportInjectionToken } from "./src/transports";
export { winstonLoggerInjectable } from "./src/winston-logger.injectable";

export type { LogFunction, Logger } from "./src/logger.injectable";
