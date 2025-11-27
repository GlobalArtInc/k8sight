import { getInjectable } from "@ogre-tools/injectable";
import podsRouteInjectable from "../../../common/front-end-routing/routes/cluster/workloads/pods/pods-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { Pods } from "./pods";

const podsRouteComponentInjectable = getInjectable({
  id: "pods-route-component",

  instantiate: (di) => ({
    route: di.inject(podsRouteInjectable),
    Component: Pods,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default podsRouteComponentInjectable;
