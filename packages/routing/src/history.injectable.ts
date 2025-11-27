import { getInjectable, getInjectionToken } from "@ogre-tools/injectable";
import { createBrowserHistory } from "history";

import type { History } from "history";

export const historyInjectionToken = getInjectionToken<History<unknown>>({
  id: "history-injection-token",
});

export const historyInjectable = getInjectable({
  id: "history",
  instantiate: () => createBrowserHistory(),
  injectionToken: historyInjectionToken,
});
