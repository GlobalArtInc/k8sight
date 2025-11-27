import { getInjectable } from "@ogre-tools/injectable";
import endpointsRouteInjectable from "../../../common/front-end-routing/routes/cluster/network/endpoints/endpoints-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { Endpoints } from "./endpoints";

const endpointsRouteComponentInjectable = getInjectable({
  id: "endpoints-route-component",

  instantiate: (di) => ({
    route: di.inject(endpointsRouteInjectable),
    Component: Endpoints,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default endpointsRouteComponentInjectable;
