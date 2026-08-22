import { sidebarItemsInjectable } from "@kubesightapp/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { reaction } from "mobx";
import { beforeClusterFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import navigateInjectable from "../../../renderer/navigation/navigate.injectable";
import currentPathInjectable from "../../../renderer/routes/current-path.injectable";
import { isRootToFrameMessage } from "../common/frame-bridge";

import type { SidebarItemDeclaration } from "@kubesightapp/cluster-sidebar";
import type { MaybeOrderable } from "@kubesightapp/utilities";

import type { FrameStateMessage, SerialisedSidebarItem } from "../common/frame-bridge";

interface FlatItem {
  item: SidebarItemDeclaration;
  isVisible: boolean;
  isActive: boolean;
}

const flatten = (items: SidebarItemDeclaration[], into: FlatItem[] = []): FlatItem[] => {
  for (const item of items) {
    into.push({ item, isVisible: item.isVisible.get(), isActive: item.isActive.get() });
    flatten(item.children, into);
  }

  return into;
};

/**
 * `orderNumber` is spread into the declaration from the registration but is absent from its type.
 */
const orderNumberOf = (item: SidebarItemDeclaration) => (item as SidebarItemDeclaration & MaybeOrderable).orderNumber;

const describe = (flat: FlatItem[]): SerialisedSidebarItem[] =>
  flat
    // A title is free-form React and only survives the trip when it happens to be a plain string.
    // Dropping the rest keeps the root frame from having to render a placeholder for a page it
    // cannot name; those items simply stay unlisted rather than being given an invented title.
    .filter(({ item }) => typeof item.title === "string")
    .map(({ item }) => ({
      id: item.id,
      parentId: item.parentId,
      title: item.title as string,
      orderNumber: orderNumberOf(item) ?? Number.MAX_SAFE_INTEGER,
      isLeaf: item.children.length === 0,
    }));

/**
 * The title of the deepest active item, e.g. `Pods` rather than its parent `Workloads`.
 */
const deepestActiveTitle = (items: SidebarItemDeclaration[]): string | undefined => {
  for (const item of items) {
    if (!item.isActive.get()) {
      continue;
    }

    return deepestActiveTitle(item.children) ?? (typeof item.title === "string" ? item.title : undefined);
  }

  return undefined;
};

/**
 * Tells the root frame what this cluster serves and where the frame currently is, and carries out
 * the navigation the root frame's navigator asks for.
 */
const frameStatePublisherInjectable = getInjectable({
  id: "frame-state-publisher",

  instantiate: (di) => {
    const sidebarItems = di.inject(sidebarItemsInjectable);
    const currentPath = di.inject(currentPathInjectable);
    const navigate = di.inject(navigateInjectable);

    return {
      run: () => {
        window.addEventListener("message", (event) => {
          if (event.source !== window.parent || !isRootToFrameMessage(event.data)) {
            return;
          }

          if (event.data.kind === "k8sight:navigate") {
            if (event.data.path !== currentPath.get()) {
              navigate(event.data.path);
            }

            return;
          }

          // Resolving against the live hierarchy covers the items registered after start-up too:
          // whatever the root frame can list, it can also ask for by id.
          flatten(sidebarItems.get())
            .find(({ item }) => item.id === event.data.itemId)
            ?.item.onClick();
        });

        reaction(
          (): FrameStateMessage => {
            const items = sidebarItems.get();
            const flat = flatten(items);

            return {
              kind: "k8sight:frame-state",
              path: currentPath.get(),
              title: deepestActiveTitle(items) ?? "",
              visibleItemIds: flat.filter(({ isVisible }) => isVisible).map(({ item }) => item.id),
              activeItemIds: flat.filter(({ isActive }) => isActive).map(({ item }) => item.id),
              items: describe(flat),
            };
          },

          // The parent's origin is the app's own, but this frame is served from a per-cluster
          // subdomain and has no dependable way to reconstruct it -- the host differs between the
          // packaged app and development, and stripping a label off it would only guess. The
          // message is a description of this frame's own menu rather than anything private, and the
          // root frame vets the sender by window identity, so "*" is left in place here.
          (state) => window.parent.postMessage(state, "*"),

          {
            fireImmediately: true,
            equals: (a, b) =>
              a.path === b.path &&
              a.title === b.title &&
              a.visibleItemIds.join() === b.visibleItemIds.join() &&
              a.activeItemIds.join() === b.activeItemIds.join() &&
              JSON.stringify(a.items) === JSON.stringify(b.items),
          },
        );
      },
    };
  },

  injectionToken: beforeClusterFrameStartsSecondInjectionToken,
});

export default frameStatePublisherInjectable;
