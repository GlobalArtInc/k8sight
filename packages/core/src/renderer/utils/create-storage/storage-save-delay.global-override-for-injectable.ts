import { getGlobalOverride } from "@kubesightapp/test-utils";
import storageSaveDelayInjectable from "./storage-save-delay.injectable";

export default getGlobalOverride(storageSaveDelayInjectable, () => 0);
