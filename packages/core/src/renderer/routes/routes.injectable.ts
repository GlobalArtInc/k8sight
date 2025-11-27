import { getInjectable } from "@ogre-tools/injectable";
import { computedInjectManyInjectable } from "@ogre-tools/injectable-extension-for-mobx";
import { matches } from "lodash/fp";
import { computed } from "mobx";
import { frontEndRouteInjectionToken } from "../../common/front-end-routing/front-end-route-injection-token";
import currentlyInClusterFrameInjectable from "./currently-in-cluster-frame.injectable";

const routesInjectable = getInjectable({
  id: "routes",

  instantiate: (di) => {
    const computedInjectMany = di.inject(computedInjectManyInjectable);
    const currentlyInClusterFrame = di.inject(currentlyInClusterFrameInjectable);
    const routes = computedInjectMany(frontEndRouteInjectionToken);

    return computed(() =>
      routes
        .get()
        .filter(matches({ clusterFrame: currentlyInClusterFrame }))
        .filter((route) => route.isEnabled.get()),
    );
  },
});

export default routesInjectable;
