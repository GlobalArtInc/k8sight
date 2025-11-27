import { getGlobalOverride } from "@kubesightapp/test-utils";
import requestIdleCallbackInjectable from "./request-idle-callback.injectable";

export default getGlobalOverride(requestIdleCallbackInjectable, () => (callback) => {
  callback();

  return 0;
});
