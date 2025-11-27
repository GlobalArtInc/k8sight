import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../../common/front-end-routing/front-end-route-injection-token";

const preferencesRouteInjectable = getInjectable({
  id: "preferences-route",

  instantiate: () => ({
    path: "/preferences/:preferenceTabId?",
    clusterFrame: false,
    isEnabled: computed(() => true),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default preferencesRouteInjectable;
