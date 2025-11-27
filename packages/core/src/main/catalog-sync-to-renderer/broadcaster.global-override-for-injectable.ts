import { getGlobalOverride } from "@kubesightapp/test-utils";
import { debounce } from "lodash";
import catalogSyncBroadcasterInjectable from "./broadcaster.injectable";

export default getGlobalOverride(catalogSyncBroadcasterInjectable, () => debounce(() => {}));
