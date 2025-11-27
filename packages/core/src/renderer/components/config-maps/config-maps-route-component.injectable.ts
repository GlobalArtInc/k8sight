import { getInjectable } from "@ogre-tools/injectable";
import configMapsRouteInjectable from "../../../common/front-end-routing/routes/cluster/config/config-maps/config-maps-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { ConfigMaps } from "./config-maps";

const configMapsRouteComponentInjectable = getInjectable({
  id: "config-maps-route-component",

  instantiate: (di) => ({
    route: di.inject(configMapsRouteInjectable),
    Component: ConfigMaps,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default configMapsRouteComponentInjectable;
