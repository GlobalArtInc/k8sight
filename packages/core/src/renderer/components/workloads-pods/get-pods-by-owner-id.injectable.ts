import { getInjectable } from "@ogre-tools/injectable";
import podStoreInjectable from "./store.injectable";

import type { Pod } from "@kubesightapp/kube-object";

export type GetPodsByOwnerId = (ownerId: string) => Pod[];

const getPodsByOwnerIdInjectable = getInjectable({
  id: "get-pods-by-owner-id",
  instantiate: (di): GetPodsByOwnerId => {
    const podStore = di.inject(podStoreInjectable);

    return (ownerId) => podStore.getPodsByOwnerId(ownerId);
  },
});

export default getPodsByOwnerIdInjectable;
