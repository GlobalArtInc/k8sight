import { historyInjectionToken } from "@kubesightapp/routing";
import { getGlobalOverride } from "@kubesightapp/test-utils";
import { createMemoryHistory } from "history";

export default getGlobalOverride(historyInjectionToken, () => createMemoryHistory());
