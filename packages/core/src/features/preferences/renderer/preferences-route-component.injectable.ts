import { getInjectable } from "@ogre-tools/injectable";
import { routeSpecificComponentInjectionToken } from "../../../renderer/routes/route-specific-component-injection-token";
import preferencesRouteInjectable from "../common/preferences-route.injectable";
import { Preferences } from "./preferences";

const preferencesRouteComponentInjectable = getInjectable({
  id: "preferences-route-component",

  instantiate: (di) => ({
    route: di.inject(preferencesRouteInjectable),
    Component: Preferences,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default preferencesRouteComponentInjectable;
