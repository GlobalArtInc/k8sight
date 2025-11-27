import { getInjectable } from "@ogre-tools/injectable";
import matchRouteInjectable from "./match-route.injectable";

import type { RouteProps } from "react-router";

export type IsRouteActive = (route: string | string[] | RouteProps) => boolean;

const isActiveRouteInjectable = getInjectable({
  id: "is-active-route",
  instantiate: (di): IsRouteActive => {
    const matchRoute = di.inject(matchRouteInjectable);

    return (route) => Boolean(matchRoute(route));
  },
});

export default isActiveRouteInjectable;
