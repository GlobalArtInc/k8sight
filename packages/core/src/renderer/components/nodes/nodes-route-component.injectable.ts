import { getInjectable } from "@ogre-tools/injectable";
import nodesRouteInjectable from "../../../common/front-end-routing/routes/cluster/nodes/nodes-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { NodesRoute } from "./route";

const nodesRouteComponentInjectable = getInjectable({
  id: "nodes-route-component",

  instantiate: (di) => ({
    route: di.inject(nodesRouteInjectable),
    Component: NodesRoute,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default nodesRouteComponentInjectable;
