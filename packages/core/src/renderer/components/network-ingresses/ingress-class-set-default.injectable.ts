import { ingressClassApiInjectable } from "@kubesightapp/kube-api-specifics";
import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import ingressClassStoreInjectable from "./ingress-class-store.injectable";

import type { IngressClass } from "@kubesightapp/kube-object";

export const ingressClassSetDefaultInjectable = getInjectable({
  id: "ingressClassSetDefaultInjectable",

  instantiate(di) {
    const api = di.inject(ingressClassApiInjectable);
    const store = di.inject(ingressClassStoreInjectable);

    return async (currentItem: IngressClass) => {
      const defaultIngressClassesUpdate = store.items
        .filter((item) => item.isDefault && currentItem !== item)
        .map((item) => api.setAsDefault({ name: item.getName() }, false));

      await Promise.all(defaultIngressClassesUpdate);
      await api.setAsDefault({ name: currentItem.getName() });
    };
  },

  lifecycle: lifecycleEnum.singleton,
});
