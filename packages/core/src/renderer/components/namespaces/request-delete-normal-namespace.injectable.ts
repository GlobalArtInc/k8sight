import { getInjectable } from "@ogre-tools/injectable";
import namespaceStoreInjectable from "./store.injectable";

import type { Namespace } from "@kubesightapp/kube-object";

export type RequestDeleteNormalNamespace = (namespace: Namespace) => Promise<void>;

const requestDeleteNormalNamespaceInjectable = getInjectable({
  id: "request-delete-normal-namespace",
  instantiate: (di): RequestDeleteNormalNamespace => {
    const namespaceStore = di.inject(namespaceStoreInjectable);

    return (namespace) => namespaceStore.remove(namespace);
  },
});

export default requestDeleteNormalNamespaceInjectable;
