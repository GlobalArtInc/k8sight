import { getInjectable } from "@ogre-tools/injectable";
import catalogRouteInjectable from "../../../common/front-end-routing/routes/catalog/catalog-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { Catalog } from "./catalog";

const catalogRouteComponentInjectable = getInjectable({
  id: "catalog-route-component",

  instantiate: (di) => ({
    route: di.inject(catalogRouteInjectable),
    Component: Catalog,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default catalogRouteComponentInjectable;
