import { getInjectable } from "@ogre-tools/injectable";
import podStoreInjectable from "./store.injectable";

import type { Pod } from "@kubesightapp/kube-object";

export type GetPodById = (id: string) => Pod | undefined;

const getPodByIdInjectable = getInjectable({
  id: "get-pod-by-id",
  instantiate: (di): GetPodById => {
    const store = di.inject(podStoreInjectable);

    return (id) => store.getById(id);
  },
});

export default getPodByIdInjectable;
