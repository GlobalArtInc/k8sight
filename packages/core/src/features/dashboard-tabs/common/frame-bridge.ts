/**
 * Direct parent<->iframe messaging between the root frame and the cluster frames.
 *
 * This deliberately sidesteps the main-process channel bus. A cluster frame cannot be told its own
 * identity up front: it is served from a per-cluster subdomain, and navigating to another origin
 * clears `window.name`, while the URL's path belongs to the frame's router. With `postMessage` the
 * root frame identifies a sender by comparing `event.source` against each iframe's `contentWindow`,
 * which needs nothing to be carried in-band and cannot be spoofed by the page.
 */

/**
 * A sidebar item as much of it as can survive `postMessage`.
 *
 * Items registered while a cluster frame runs -- one per CRD, or whatever an extension adds -- have
 * no counterpart in the root frame's registry, so the root has to be told they exist at all. What
 * stays behind is anything that is not data: `onClick` (the root asks the frame to run it by id)
 * and the icon, which is a React node.
 */
export interface SerialisedSidebarItem {
  readonly id: string;
  readonly parentId: string | null;
  /** Items titled with a React node are left out entirely -- see the publisher. */
  readonly title: string;
  readonly orderNumber: number;
  /**
   * Whether the item is a page rather than a section. A section is only shown when something is
   * left under it, so the two cannot be told apart by counting the children that came through.
   */
  readonly isLeaf: boolean;
}

/**
 * A frame describing what it is currently showing.
 *
 * Both frames run the same bundle, so the root frame already has the title and icon of every item
 * registered up front; for those, only ids need to travel. What it cannot know is which of them a
 * given cluster actually serves, which one the frame is on, and what the frame has registered since
 * it started.
 */
export interface FrameStateMessage {
  readonly kind: "k8sight:frame-state";
  readonly path: string;
  readonly title: string;
  readonly visibleItemIds: string[];
  readonly activeItemIds: string[];
  /**
   * Every item the frame has, described. A frame has no way of knowing which of them the root
   * frame's registry is missing, so it describes all of them and the root keeps what is new to it.
   */
  readonly items: SerialisedSidebarItem[];
}

export interface ActivateSidebarItemMessage {
  readonly kind: "k8sight:activate-sidebar-item";
  readonly itemId: string;
}

export interface NavigateMessage {
  readonly kind: "k8sight:navigate";
  readonly path: string;
}

export type RootToFrameMessage = ActivateSidebarItemMessage | NavigateMessage;

export const isFrameStateMessage = (data: unknown): data is FrameStateMessage =>
  typeof data === "object" && data !== null && (data as FrameStateMessage).kind === "k8sight:frame-state";

export const isRootToFrameMessage = (data: unknown): data is RootToFrameMessage =>
  typeof data === "object" &&
  data !== null &&
  ((data as RootToFrameMessage).kind === "k8sight:activate-sidebar-item" ||
    (data as RootToFrameMessage).kind === "k8sight:navigate");
