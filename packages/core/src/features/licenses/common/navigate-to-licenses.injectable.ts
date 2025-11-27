import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../common/front-end-routing/navigate-to-route-injection-token";
import licensesRouteInjectable from "./licenses-route.injectable";

const navigateToLicensesInjectable = getInjectable({
  id: "navigate-to-licenses",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const licensesRoute = di.inject(licensesRouteInjectable);

    return () => navigateToRoute(licensesRoute);
  },
});

export default navigateToLicensesInjectable;
