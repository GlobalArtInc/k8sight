import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../common/front-end-routing/navigate-to-route-injection-token";
import catalogRouteInjectable from "../../../common/front-end-routing/routes/catalog/catalog-route.injectable";

const closeLicensesInjectable = getInjectable({
  id: "close-licenses",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const catalogRoute = di.inject(catalogRouteInjectable);

    return () => {
      navigateToRoute(catalogRoute);
    };
  },
});

export default closeLicensesInjectable;
