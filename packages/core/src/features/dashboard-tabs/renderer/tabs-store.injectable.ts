import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import createStorageInjectable from "../../../renderer/utils/create-storage/create-storage.injectable";

import type { ClusterId } from "../../../common/cluster-types";
import type { DashboardTab } from "../common/tab";

export interface DashboardTabsState {
  tabs: DashboardTab[];
  activeTabId: string | undefined;
}

export interface OpenTabOptions {
  /** Page to open the tab on. Defaults to the frame's own start page. */
  path?: string;
  title?: string;
  /** When false the tab is opened in the background. Defaults to true. */
  activate?: boolean;
}

export interface DashboardTabsStore {
  readonly tabs: ReturnType<typeof computed<DashboardTab[]>>;
  readonly activeTab: ReturnType<typeof computed<DashboardTab | undefined>>;
  openTab: (clusterId: ClusterId, options?: OpenTabOptions) => DashboardTab;
  /** Focuses the most recent tab for the cluster, opening one if there is none. */
  focusOrOpenForCluster: (clusterId: ClusterId) => DashboardTab;
  /** Opens a copy of the tab -- same cluster, same page -- next to it, and focuses it. */
  duplicateTab: (tabId: string) => DashboardTab | undefined;
  activateTab: (tabId: string) => void;
  closeTab: (tabId: string) => void;
  /** Closes every tab but this one, sparing pinned tabs. */
  closeOtherTabs: (tabId: string) => void;
  /** Closes every tab after this one in the strip, sparing pinned tabs. */
  closeTabsToTheRight: (tabId: string) => void;
  closeTabsForCluster: (clusterId: ClusterId) => void;
  setTabPinned: (tabId: string, pinned: boolean) => void;
  /** Points an existing tab at another cluster, keeping its place in the strip. */
  retargetTab: (tabId: string, clusterId: ClusterId) => DashboardTab | undefined;
  moveTab: (tabId: string, toIndex: number) => void;
  /** Applied when a frame reports where it has navigated to. */
  syncTabFromFrame: (tabId: string, path: string, title: string) => void;
}

const dashboardTabsStoreInjectable = getInjectable({
  id: "dashboard-tabs-store",

  instantiate: (di): DashboardTabsStore => {
    const createStorage = di.inject(createStorageInjectable);
    const getRandomId = di.inject(getRandomIdInjectionToken);

    const storage = createStorage<DashboardTabsState>("dashboard-tabs", {
      tabs: [],
      activeTabId: undefined,
    });

    /**
     * Restores the pinned-first order after a mutation, keeping each group's own order.
     *
     * The pinning order lives in the stored array rather than in a sorted view over it, because the
     * strip renders the array as-is and `moveTab` addresses it by index -- a view would put the two
     * out of step the moment a pinned tab was not already first.
     */
    const sortPinnedFirst = (tabs: DashboardTab[]) => {
      const pinned = tabs.filter((tab) => tab.pinned);

      return pinned.length === 0 || pinned.length === tabs.length
        ? tabs
        : [...pinned, ...tabs.filter((tab) => !tab.pinned)];
    };

    const tabs = computed(() => storage.get().tabs);
    const activeTab = computed(() => {
      const { tabs, activeTabId } = storage.get();

      return tabs.find((tab) => tab.id === activeTabId);
    });

    const activateTab = (tabId: string) => {
      storage.merge((draft) => {
        if (draft.tabs.some((tab) => tab.id === tabId)) {
          draft.activeTabId = tabId;
        }
      });
    };

    const openTab = (clusterId: ClusterId, { path = "", title = "", activate = true }: OpenTabOptions = {}) => {
      const tab: DashboardTab = { id: getRandomId(), clusterId, path, title };

      storage.merge((draft) => {
        draft.tabs.push(tab);

        if (activate) {
          draft.activeTabId = tab.id;
        }
      });

      return tab;
    };

    /**
     * Closing the focused tab hands focus to its right-hand neighbour, falling back to the left --
     * the same rule browsers use, so the strip does not jump to an unrelated cluster.
     */
    const closeTab = (tabId: string) => {
      storage.merge((draft) => {
        const index = draft.tabs.findIndex((tab) => tab.id === tabId);

        if (index === -1) {
          return;
        }

        draft.tabs.splice(index, 1);

        if (draft.activeTabId === tabId) {
          draft.activeTabId = (draft.tabs[index] ?? draft.tabs[index - 1])?.id;
        }
      });
    };

    return {
      tabs,
      activeTab,
      openTab,
      activateTab,
      closeTab,

      focusOrOpenForCluster: (clusterId) => {
        const existing = [...storage.get().tabs].reverse().find((tab) => tab.clusterId === clusterId);

        if (existing) {
          activateTab(existing.id);

          return existing;
        }

        return openTab(clusterId);
      },

      duplicateTab: (tabId) => {
        const source = storage.get().tabs.find((tab) => tab.id === tabId);

        if (!source) {
          return undefined;
        }

        // The copy starts out unpinned: pinning is about the tab you kept, not about its clones.
        const duplicate: DashboardTab = {
          id: getRandomId(),
          clusterId: source.clusterId,
          path: source.path,
          title: source.title,
        };

        storage.merge((draft) => {
          const index = draft.tabs.findIndex((tab) => tab.id === tabId);

          draft.tabs.splice(index + 1, 0, duplicate);
          draft.tabs = sortPinnedFirst(draft.tabs);
          draft.activeTabId = duplicate.id;
        });

        return duplicate;
      },

      closeOtherTabs: (tabId) => {
        storage.merge((draft) => {
          draft.tabs = draft.tabs.filter((tab) => tab.id === tabId || tab.pinned);
          draft.activeTabId = tabId;
        });
      },

      closeTabsToTheRight: (tabId) => {
        storage.merge((draft) => {
          const index = draft.tabs.findIndex((tab) => tab.id === tabId);

          if (index === -1) {
            return;
          }

          draft.tabs = draft.tabs.filter((tab, tabIndex) => tabIndex <= index || tab.pinned);

          if (!draft.tabs.some((tab) => tab.id === draft.activeTabId)) {
            draft.activeTabId = tabId;
          }
        });
      },

      setTabPinned: (tabId, pinned) => {
        storage.merge((draft) => {
          const tab = draft.tabs.find((tab) => tab.id === tabId);

          if (!tab || Boolean(tab.pinned) === pinned) {
            return;
          }

          if (pinned) {
            tab.pinned = true;
          } else {
            delete tab.pinned;
          }

          draft.tabs = sortPinnedFirst(draft.tabs);
        });
      },

      closeTabsForCluster: (clusterId) => {
        storage.merge((draft) => {
          draft.tabs = draft.tabs.filter((tab) => tab.clusterId !== clusterId);

          if (!draft.tabs.some((tab) => tab.id === draft.activeTabId)) {
            draft.activeTabId = draft.tabs[draft.tabs.length - 1]?.id;
          }
        });
      },

      /**
       * The frame is bound to its cluster for life, so switching cluster means a new tab -- and a
       * new frame -- dropped into the outgoing tab's slot. The old frame is torn down by the
       * reconciliation that watches for tabs disappearing.
       */
      retargetTab: (tabId, clusterId) => {
        const existing = storage.get().tabs.find((tab) => tab.id === tabId);

        if (!existing || existing.clusterId === clusterId) {
          return existing;
        }

        // The pin belongs to the slot in the strip, so it survives the swap of what fills it.
        const replacement: DashboardTab = {
          id: getRandomId(),
          clusterId,
          path: "",
          title: "",
          ...(existing.pinned ? { pinned: true } : {}),
        };

        storage.merge((draft) => {
          const index = draft.tabs.findIndex((tab) => tab.id === tabId);

          if (index === -1) {
            return;
          }

          draft.tabs.splice(index, 1, replacement);

          if (draft.activeTabId === tabId) {
            draft.activeTabId = replacement.id;
          }
        });

        return replacement;
      },

      moveTab: (tabId, toIndex) => {
        storage.merge((draft) => {
          const fromIndex = draft.tabs.findIndex((tab) => tab.id === tabId);

          if (fromIndex === -1 || toIndex < 0 || toIndex >= draft.tabs.length || fromIndex === toIndex) {
            return;
          }

          const [moved] = draft.tabs.splice(fromIndex, 1);

          draft.tabs.splice(toIndex, 0, moved);
          // A drag that would carry a tab across the pinned boundary snaps back, as in a browser.
          draft.tabs = sortPinnedFirst(draft.tabs);
        });
      },

      syncTabFromFrame: (tabId, path, title) => {
        storage.merge((draft) => {
          const tab = draft.tabs.find((tab) => tab.id === tabId);

          if (!tab || (tab.path === path && tab.title === title)) {
            return;
          }

          tab.path = path;
          tab.title = title;
        });
      },
    };
  },
});

export default dashboardTabsStoreInjectable;
