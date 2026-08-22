import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import apiManagerInjectable from "../../../common/k8s-api/api-manager/manager.injectable";
import customResourceDefinitionStoreInjectable from "../custom-resource-definitions/store.injectable";
import { fluxKindGroups } from "./flux-resource-kinds";
import { fluxStateOf, messageOf } from "./flux-state";

import type { KubeObject } from "@kubesightapp/kube-object";

import type { ApiManager } from "../../../common/k8s-api/api-manager";
import type { FluxKind } from "./flux-resource-kinds";
import type { FluxState } from "./flux-state";

/** The store the api manager built for one of the cluster's Flux CRDs. */
export type FluxStore = NonNullable<ReturnType<ApiManager["getStore"]>>;

export interface FluxSummary {
  title: string;
  total: number;
  ready: number;
  failing: number;
  reconciling: number;
  suspended: number;
  /** False when the cluster serves none of the group's kinds. */
  isPresent: boolean;
  /** Where the card leads: the first of the group's kinds this cluster actually serves. */
  primaryKind: FluxKind | undefined;
}

export interface FluxTrouble {
  kind: FluxKind;
  name: string;
  namespace: string | undefined;
  state: FluxState;
  message: string;
  /** Identifies the object to the details panel. */
  selfLink: string | undefined;
}

export interface FluxSummaries {
  summaries: ReturnType<typeof computed<FluxSummary[]>>;
  needsAttention: ReturnType<typeof computed<FluxTrouble[]>>;
  /** The stores behind the numbers, for the page to subscribe to. */
  stores: ReturnType<typeof computed<FluxStore[]>>;
}

const fluxSummariesInjectable = getInjectable({
  id: "flux-summaries",

  instantiate: (di) => {
    const apiManager = di.inject(apiManagerInjectable);
    const customResourceDefinitionStore = di.inject(customResourceDefinitionStoreInjectable);

    /**
     * Flux resources have no built-in stores; they are custom resources, so the store is whatever
     * the api manager built for the cluster's own CRD.
     *
     * Once found, a store is remembered. Resolving it goes through the observable registry of kube
     * apis, which briefly loses an entry while a CRD is re-registered -- and a store that blinks
     * out and back is a store set that changed, which would tear down the page's watches and start
     * them again every few seconds.
     */
    const resolvedStores = new Map<string, FluxStore>();

    const storeOf = ({ group, plural }: FluxKind) => {
      const key = `${group}/${plural}`;
      const remembered = resolvedStores.get(key);

      if (remembered) {
        return remembered;
      }

      const crd = customResourceDefinitionStore.getByGroup(group, plural);
      const store = crd ? apiManager.getStore(crd.getResourceApiBase()) : undefined;

      if (store) {
        resolvedStores.set(key, store);
      }

      return store;
    };

    const itemsOf = (kinds: FluxKind[]) =>
      kinds.flatMap((kind) => {
        const items = storeOf(kind)?.items ?? [];

        return items.map((item) => ({ item: item as KubeObject, kind }));
      });

    const servedKinds = (kinds: FluxKind[]) => kinds.filter((kind) => Boolean(storeOf(kind)));

    return {
      summaries: computed(() =>
        fluxKindGroups.map(({ title, kinds }): FluxSummary => {
          const states = itemsOf(kinds).map(({ item }) => fluxStateOf(item));
          const count = (state: FluxState) => states.filter((it) => it === state).length;

          return {
            title,
            total: states.length,
            ready: count("ready"),
            failing: count("failing"),
            reconciling: count("reconciling"),
            suspended: count("suspended"),
            isPresent: servedKinds(kinds).length > 0,
            primaryKind: servedKinds(kinds)[0],
          };
        }),
      ),

      needsAttention: computed(() =>
        fluxKindGroups
          .flatMap(({ kinds }) => itemsOf(kinds))
          .map(({ item, kind }) => ({ item, kind, state: fluxStateOf(item) }))
          .filter(({ state }) => state !== "ready")
          .map(
            ({ item, kind, state }): FluxTrouble => ({
              kind,
              name: item.getName(),
              namespace: item.getNs(),
              state,
              message: messageOf(item),
              selfLink: item.selfLink,
            }),
          )
          // Failures first: they are what someone opening this page came to find.
          .sort((left, right) => Number(right.state === "failing") - Number(left.state === "failing")),
      ),

      stores: computed(() =>
        fluxKindGroups
          .flatMap(({ kinds }) => kinds)
          .map(storeOf)
          .filter((store): store is FluxStore => Boolean(store)),
      ),
    };
  },
});

export default fluxSummariesInjectable;
