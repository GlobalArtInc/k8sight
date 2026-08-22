import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { ClusterId } from "../../../common/cluster-types";
import type { SerialisedSidebarItem } from "../common/frame-bridge";

export interface FrameState {
  readonly clusterId: ClusterId;
  readonly path: string;
  readonly title: string;
  /** Sidebar items this cluster actually serves. */
  readonly visibleItemIds: Set<string>;
  readonly activeItemIds: Set<string>;
  /**
   * Every sidebar item the frame has, as it described them. The navigator builds its tree from the
   * root frame's own registrations and takes from here only the items that registry never had.
   */
  readonly items: readonly SerialisedSidebarItem[];
}

/**
 * What each live cluster frame last reported about itself, keyed by view id.
 *
 * The root frame owns the navigator but cannot work out on its own which pages a cluster serves --
 * that depends on the cluster's API resources and RBAC, which only its own frame can see.
 */
const frameStatesInjectable = getInjectable({
  id: "frame-states",
  instantiate: () => observable.map<string, FrameState>(),
});

export default frameStatesInjectable;
