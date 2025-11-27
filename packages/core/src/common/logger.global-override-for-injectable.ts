import { loggerInjectionToken } from "@kubesightapp/logger";
import { getGlobalOverride } from "@kubesightapp/test-utils";

export default getGlobalOverride(loggerInjectionToken, () => ({
  warn: () => {},
  debug: () => {},
  error: () => {},
  info: () => {},
  silly: () => {},
}));
