import { getInjectable } from "@ogre-tools/injectable";
import getClusterByIdInjectable from "../../features/cluster/storage/common/get-by-id.injectable";
import hostedClusterIdInjectable from "./hosted-cluster-id.injectable";

const hostedClusterInjectable = getInjectable({
  id: "hosted-cluster",

  instantiate: (di) => {
    const hostedClusterId = di.inject(hostedClusterIdInjectable);
    const getClusterById = di.inject(getClusterByIdInjectable);

    if (!hostedClusterId) {
      return undefined;
    }

    return getClusterById(hostedClusterId);
  },
});

export default hostedClusterInjectable;
