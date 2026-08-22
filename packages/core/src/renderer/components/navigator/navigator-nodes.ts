import { byOrderNumber, isDefined } from "@kubesightapp/utilities";

import type { SidebarItemDeclaration } from "@kubesightapp/cluster-sidebar";
import type { MaybeOrderable, StrictReactNode } from "@kubesightapp/utilities";

import type { SerialisedSidebarItem } from "../../../features/dashboard-tabs/common/frame-bridge";
import type { FrameState } from "../../../features/dashboard-tabs/renderer/frame-states.injectable";

/** One row of the navigator's tree, ready to render: everything under it is served. */
export interface NavigatorNode {
  readonly id: string;
  readonly title: StrictReactNode;
  /**
   * Missing for items the cluster frame described: an icon is a React node, so it cannot cross the
   * frame boundary. Those rows draw without one rather than borrowing an unrelated icon.
   */
  readonly getIcon?: () => StrictReactNode;
  readonly children: NavigatorNode[];
}

interface DraftNode extends NavigatorNode {
  readonly orderNumber: number;
  /** A page, as opposed to a section that only exists to hold pages. */
  readonly isLeaf: boolean;
  readonly children: DraftNode[];
}

/**
 * `orderNumber` is spread into the declaration from the registration but is absent from its type.
 */
const orderNumberOf = (item: SidebarItemDeclaration) => (item as SidebarItemDeclaration & MaybeOrderable).orderNumber;

const collectIds = (items: SidebarItemDeclaration[], into = new Set<string>()): Set<string> => {
  for (const item of items) {
    into.add(item.id);
    collectIds(item.children, into);
  }

  return into;
};

/**
 * The navigator's tree for one cluster.
 *
 * The hierarchy comes from the root frame's own registrations, which carry the icons and the
 * titles. On top of that go the items that only exist inside the cluster's frame -- one per CRD,
 * plus whatever its extensions add -- which the root frame's registry has never heard of and can
 * only know from what the frame reported.
 *
 * Anything the cluster does not serve is dropped, so a section is kept exactly while it still has a
 * page under it.
 */
export const buildNavigatorNodes = (registered: SidebarItemDeclaration[], state: FrameState): NavigatorNode[] => {
  const registeredIds = collectIds(registered);
  const describedByParent = new Map<string | null, SerialisedSidebarItem[]>();

  for (const item of state.items) {
    if (registeredIds.has(item.id)) {
      continue;
    }

    describedByParent.set(item.parentId, [...(describedByParent.get(item.parentId) ?? []), item]);
  }

  const fromFrame = (parentId: string | null): DraftNode[] =>
    (describedByParent.get(parentId) ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      orderNumber: item.orderNumber,
      isLeaf: item.isLeaf,
      children: fromFrame(item.id),
    }));

  const fromRegistry = (items: SidebarItemDeclaration[]): DraftNode[] =>
    items.map((item) => {
      const children = [...fromRegistry(item.children), ...fromFrame(item.id)].sort(byOrderNumber);

      return {
        id: item.id,
        title: item.title,
        getIcon: item.getIcon,
        orderNumber: orderNumberOf(item) ?? Number.MAX_SAFE_INTEGER,
        isLeaf: children.length === 0,
        children,
      };
    });

  const prune = (nodes: DraftNode[]): NavigatorNode[] =>
    nodes
      .map(({ id, title, getIcon, isLeaf, children }): NavigatorNode | undefined => {
        if (isLeaf) {
          return state.visibleItemIds.has(id) ? { id, title, getIcon, children: [] } : undefined;
        }

        const served = prune(children);

        // A section whose pages are all unserved -- or whose only children were described in a
        // form that could not be serialised -- has nothing left to open.
        return served.length > 0 ? { id, title, getIcon, children: served } : undefined;
      })
      .filter(isDefined);

  return prune([...fromRegistry(registered), ...fromFrame(null)].sort(byOrderNumber));
};
