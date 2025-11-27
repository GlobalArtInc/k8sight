import { isDefined } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";

import type { CoreV1Api } from "@kubesightapp/kubernetes-client-node";

export type ListNamespaces = () => Promise<string[]>;
export type CreateListNamespaces = (api: CoreV1Api) => ListNamespaces;

const createListNamespacesInjectable = getInjectable({
  id: "create-list-namespaces",
  instantiate: (): CreateListNamespaces => (api) => async () => {
    const { items } = await api.listNamespace();

    return items.map((ns) => ns.metadata?.name).filter(isDefined);
  },
});

export default createListNamespacesInjectable;
