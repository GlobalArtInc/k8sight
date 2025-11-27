import { getInjectable } from "@ogre-tools/injectable";
import statefulsetsRouteInjectable from "../../../common/front-end-routing/routes/cluster/workloads/statefulsets/statefulsets-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { StatefulSets } from "./statefulsets";

const statefulsetsRouteComponentInjectable = getInjectable({
  id: "statefulsets-route-component",

  instantiate: (di) => ({
    route: di.inject(statefulsetsRouteInjectable),
    Component: StatefulSets,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default statefulsetsRouteComponentInjectable;
