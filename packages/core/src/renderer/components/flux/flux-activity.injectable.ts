import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import apiManagerInjectable from "../../../common/k8s-api/api-manager/manager.injectable";
import eventStoreInjectable from "../events/store.injectable";
import { fluxKindGroups } from "./flux-resource-kinds";

import type { KubeEvent } from "@kubesightapp/kube-object";

import type { EventStore } from "../events/store";
import type { FluxKind } from "./flux-resource-kinds";

/**
 * How many rows the panel keeps.
 *
 * Flux reconciles on a loop, so a cluster of any size emits events continuously and the event store
 * holds up to a thousand of them at a time. This panel answers "what has Flux just done", which the
 * newest handful already answers; anyone who wants the whole history has the Events page. Stopping
 * here also keeps every arriving event from re-rendering hundreds of rows nobody reads.
 */
const recentActivityLimit = 50;

/** Kinds the dashboard can navigate to, keyed by the `group/Kind` an event's involvedObject names. */
const fluxKindsByReference = new Map(
  fluxKindGroups.flatMap(({ kinds }) => kinds.map((kind) => [`${kind.group}/${kind.kind}`, kind] as const)),
);

const fluxGroups = new Set(fluxKindGroups.flatMap(({ kinds }) => kinds.map(({ group }) => group)));

/**
 * An involvedObject carries `apiVersion`, not a group: `kustomize.toolkit.fluxcd.io/v1` for a custom
 * resource, a bare `v1` for anything in the core group.
 */
const groupOf = (apiVersion: string) => (apiVersion.includes("/") ? apiVersion.slice(0, apiVersion.indexOf("/")) : "");

/** Flux writes progress into `lastTimestamp`, so a repeating event stays where its latest report puts it. */
const timestampOf = (event: KubeEvent) => event.lastTimestamp ?? event.eventTime ?? event.metadata.creationTimestamp;

export interface FluxActivity {
  /** The event's uid: stable while the store re-sorts, so rows are not rebuilt as events stream in. */
  id: string;
  /** Undefined for a Flux group kind this build does not catalogue, which leaves the row unnavigable. */
  kind: FluxKind | undefined;
  /** Always shown, even when `kind` is undefined. */
  kindName: string;
  name: string;
  namespace: string | undefined;
  reason: string;
  message: string;
  /** Feeds the age column; undefined when the event carries no time at all. */
  timestamp: string | undefined;
  isWarning: boolean;
  /** Identifies the involved object to the details panel. */
  selfLink: string;
}

export interface FluxActivityFeed {
  activity: ReturnType<typeof computed<FluxActivity[]>>;
  /** The store behind the feed, for the page to subscribe to. */
  store: EventStore;
}

const fluxActivityInjectable = getInjectable({
  id: "flux-activity",

  instantiate: (di): FluxActivityFeed => {
    const apiManager = di.inject(apiManagerInjectable);
    const eventStore = di.inject(eventStoreInjectable);

    return {
      store: eventStore,

      activity: computed(() =>
        eventStore.contextItems
          .filter((event) => fluxGroups.has(groupOf(event.involvedObject.apiVersion)))
          // Newest first: the store's own order is by creation, which is not when the event last fired.
          .sort((left, right) => Date.parse(timestampOf(right) ?? "") - Date.parse(timestampOf(left) ?? ""))
          .slice(0, recentActivityLimit)
          .map((event): FluxActivity => {
            const { involvedObject } = event;

            return {
              id: event.getId(),
              kind: fluxKindsByReference.get(`${groupOf(involvedObject.apiVersion)}/${involvedObject.kind}`),
              kindName: involvedObject.kind,
              name: involvedObject.name,
              namespace: involvedObject.namespace || event.getNs(),
              reason: event.reason ?? "",
              message: event.message ?? "",
              timestamp: timestampOf(event),
              isWarning: event.isWarning(),
              selfLink: apiManager.lookupApiLink(involvedObject, event),
            };
          }),
      ),
    };
  },
});

export default fluxActivityInjectable;
