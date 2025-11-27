import { buildVersionInitializable } from "../../../features/vars/build-version/common/token";
import { route } from "../../router/route";
import { getRouteInjectable } from "../../router/router.injectable";

const getVersionRouteInjectable = getRouteInjectable({
  id: "get-version-route",

  instantiate: (di) =>
    route({
      method: "get",
      path: `/version`,
    })(() => ({
      response: {
        version: di.inject(buildVersionInitializable.stateToken),
      },
    })),
});

export default getVersionRouteInjectable;
