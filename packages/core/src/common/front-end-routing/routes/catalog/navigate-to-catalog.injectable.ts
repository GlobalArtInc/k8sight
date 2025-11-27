import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../navigate-to-route-injection-token";
import catalogRouteInjectable from "./catalog-route.injectable";

import type { CatalogPathParameters } from "./catalog-route.injectable";

export type NavigateToCatalog = (parameters?: CatalogPathParameters) => void;

const navigateToCatalogInjectable = getInjectable({
  id: "navigate-to-catalog",

  instantiate: (di): NavigateToCatalog => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const catalogRoute = di.inject(catalogRouteInjectable);

    return (parameters) =>
      navigateToRoute(catalogRoute, {
        parameters,
      });
  },
});

export default navigateToCatalogInjectable;
