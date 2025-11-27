import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";

const logErrorInjectable = getInjectable({
  id: "log-error",
  instantiate: (di) => di.inject(loggerInjectionToken).error,
  decorable: false,
});

export default logErrorInjectable;
