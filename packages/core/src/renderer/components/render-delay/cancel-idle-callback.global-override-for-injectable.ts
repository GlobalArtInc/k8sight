import { getGlobalOverride } from "@kubesightapp/test-utils";
import cancelIdleCallbackInjectable from "./cancel-idle-callback.injectable";

export default getGlobalOverride(cancelIdleCallbackInjectable, () => () => {});
