import { getInjectable } from "@ogre-tools/injectable";
import { getClusterIdFromHost } from "../../common/utils";

const hostedClusterIdInjectable = getInjectable({
  id: "hosted-cluster-id",
  instantiate: () => getClusterIdFromHost(location.host),
  causesSideEffects: true,
});

export default hostedClusterIdInjectable;
