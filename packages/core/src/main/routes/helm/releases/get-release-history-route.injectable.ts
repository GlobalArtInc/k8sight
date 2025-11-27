import { apiPrefix } from "../../../../common/vars";
import getClusterHelmReleaseHistoryInjectable from "../../../helm/helm-service/get-helm-release-history.injectable";
import { clusterRoute } from "../../../router/route";
import { getRouteInjectable } from "../../../router/router.injectable";

const getReleaseRouteHistoryInjectable = getRouteInjectable({
  id: "get-release-history-route",

  instantiate: (di) => {
    const getHelmReleaseHistory = di.inject(getClusterHelmReleaseHistoryInjectable);

    return clusterRoute({
      method: "get",
      path: `${apiPrefix}/v2/releases/{namespace}/{name}/history`,
    })(async ({ cluster, params }) => ({
      response: await getHelmReleaseHistory(cluster, params),
    }));
  },
});

export default getReleaseRouteHistoryInjectable;
