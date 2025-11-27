import { getInjectable } from "@ogre-tools/injectable";
import ingressesRouteInjectable from "../../../common/front-end-routing/routes/cluster/network/ingresses/ingresses-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { Ingresses } from "./ingresses";

const ingressesRouteComponentInjectable = getInjectable({
  id: "ingresses-route-component",

  instantiate: (di) => ({
    route: di.inject(ingressesRouteInjectable),
    Component: Ingresses,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default ingressesRouteComponentInjectable;
