import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../../common/front-end-routing/front-end-route-injection-token";

const licensesRouteInjectable = getInjectable({
  id: "licenses-route",

  instantiate: () => ({
    path: "/licenses",
    clusterFrame: false,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default licensesRouteInjectable;
