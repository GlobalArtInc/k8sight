import { getInjectionToken } from "@ogre-tools/injectable";

import type { Route } from "../../common/front-end-routing/front-end-route-injection-token";

export const routeSpecificComponentInjectionToken = getInjectionToken<{
  route: Route<unknown>;
  Component: React.ElementType<any>;
}>({
  id: "route-specific-component-injection-token",
});
