import { Icon } from "@kubesightapp/icon";
import { cssNames, noop } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import navigateToCatalogInjectable from "../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import navigateToClusterViewInjectable from "../../../common/front-end-routing/routes/cluster-view/navigate-to-cluster-view.injectable";
import dashboardTabsStoreInjectable from "../../../features/dashboard-tabs/renderer/tabs-store.injectable";
import catalogEntityRegistryInjectable from "../../api/catalog/entity/registry.injectable";
import { Menu, MenuItem } from "../menu";
import styles from "./tab-strip.module.scss";

import type { NavigateToCatalog } from "../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import type { NavigateToClusterView } from "../../../common/front-end-routing/routes/cluster-view/navigate-to-cluster-view.injectable";
import type { DashboardTab } from "../../../features/dashboard-tabs/common/tab";
import type { DashboardTabsStore } from "../../../features/dashboard-tabs/renderer/tabs-store.injectable";
import type { CatalogEntityRegistry } from "../../api/catalog/entity/registry";

interface Dependencies {
  tabsStore: DashboardTabsStore;
  entityRegistry: CatalogEntityRegistry;
  navigateToClusterView: NavigateToClusterView;
  navigateToCatalog: NavigateToCatalog;
}

interface ContextMenuState {
  tabId: string;
  x: number;
  y: number;
}

const NonInjectedTabStrip = observer(({ tabsStore, entityRegistry, navigateToClusterView, navigateToCatalog }: Dependencies) => {
  const [draggedTabId, setDraggedTabId] = useState<string | undefined>();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | undefined>();
  const tabs = tabsStore.tabs.get();
  const activeTab = tabsStore.activeTab.get();

  if (tabs.length === 0) {
    return null;
  }

  const clusterNameOf = (tab: DashboardTab) => entityRegistry.getById(tab.clusterId)?.getName() ?? tab.clusterId;

  const isConnected = (tab: DashboardTab) => entityRegistry.getById(tab.clusterId)?.status?.phase === "connected";

  const activate = (tab: DashboardTab) => {
    tabsStore.activateTab(tab.id);
    navigateToClusterView(tab.clusterId);
  };

  /**
   * Closing and navigating away have to land together, in one action.
   *
   * `ClusterView` opens a tab for whichever cluster the route names when none is focused. If the
   * close were visible on its own -- tab gone, route still pointing at the cluster -- that is
   * exactly the state it would react to, and it would reopen the tab, and with it the connection,
   * the moment you closed it.
   */
  const closingWith = (closeTabs: () => void) => {
    runInAction(() => {
      closeTabs();

      const nextTab = tabsStore.activeTab.get();

      if (nextTab) {
        navigateToClusterView(nextTab.clusterId);
      } else {
        navigateToCatalog();
      }
    });
  };

  const close = (event: React.MouseEvent, tab: DashboardTab) => {
    event.stopPropagation();
    closingWith(() => tabsStore.closeTab(tab.id));
  };

  const duplicate = (tab: DashboardTab) => {
    runInAction(() => {
      const duplicated = tabsStore.duplicateTab(tab.id);

      if (duplicated) {
        navigateToClusterView(duplicated.clusterId);
      }
    });
  };

  const menuTab = contextMenu && tabs.find((tab) => tab.id === contextMenu.tabId);
  const menuTabIndex = menuTab ? tabs.indexOf(menuTab) : -1;
  const closableOthers = menuTab ? tabs.some((tab) => tab.id !== menuTab.id && !tab.pinned) : false;
  const closableToTheRight = menuTab ? tabs.slice(menuTabIndex + 1).some((tab) => !tab.pinned) : false;

  return (
    <div className={styles.tabStrip} data-testid="dashboard-tab-strip" role="tablist">
      <div className={styles.tabs}>
        {tabs.map((tab, index) => {
          const clusterName = clusterNameOf(tab);

          return (
            <div
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeTab?.id}
              tabIndex={0}
              draggable
              data-testid={`dashboard-tab-${tab.id}`}
              className={cssNames(styles.tab, {
                [styles.active]: tab.id === activeTab?.id,
                [styles.dragging]: tab.id === draggedTabId,
              })}
              title={`${tab.title || clusterName} — ${clusterName}`}
              onClick={() => activate(tab)}
              onAuxClick={(event) => event.button === 1 && close(event, tab)}
              onKeyDown={(event) => event.key === "Enter" && activate(tab)}
              onContextMenu={(event) => {
                // Keeps the platform menu away, and tells the open <Menu/> this is a reposition
                // rather than a right-click outside it that should close it.
                event.preventDefault();
                setContextMenu({ tabId: tab.id, x: event.clientX, y: event.clientY });
              }}
              onDragStart={() => setDraggedTabId(tab.id)}
              onDragEnd={() => setDraggedTabId(undefined)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggedTabId) {
                  tabsStore.moveTab(draggedTabId, index);
                }

                setDraggedTabId(undefined);
              }}
            >
              <span className={cssNames(styles.status, { [styles.connected]: isConnected(tab) })} />
              {tab.pinned && <Icon material="push_pin" small className={styles.pin} />}
              <span className={styles.label}>
                {tab.title ? `${tab.title} - ${clusterName}` : clusterName}
              </span>
              <Icon
                material="close"
                small
                className={styles.close}
                data-testid={`close-dashboard-tab-${tab.id}`}
                onClick={(event: React.MouseEvent) => close(event, tab)}
              />
            </div>
          );
        })}
      </div>

      <Menu
        isOpen={Boolean(menuTab)}
        open={noop}
        close={() => setContextMenu(undefined)}
        usePortal
        closeOnScroll
        cursorPosition={contextMenu && { x: contextMenu.x, y: contextMenu.y }}
        data-testid="dashboard-tab-menu"
      >
        {menuTab && (
          <MenuItem icon="content_copy" onClick={() => duplicate(menuTab)} data-testid="duplicate-dashboard-tab">
            Duplicate tab
          </MenuItem>
        )}
        {menuTab && (
          <MenuItem
            icon="push_pin"
            onClick={() => tabsStore.setTabPinned(menuTab.id, !menuTab.pinned)}
            data-testid="pin-dashboard-tab"
          >
            {menuTab.pinned ? "Unpin tab" : "Pin tab"}
          </MenuItem>
        )}
        {menuTab && <MenuItem spacer />}
        {menuTab && (
          <MenuItem
            icon="close"
            onClick={() => closingWith(() => tabsStore.closeTab(menuTab.id))}
            data-testid="menu-close-dashboard-tab"
          >
            Close
          </MenuItem>
        )}
        {menuTab && (
          <MenuItem
            icon="clear_all"
            disabled={!closableOthers}
            onClick={() => closingWith(() => tabsStore.closeOtherTabs(menuTab.id))}
            data-testid="close-other-dashboard-tabs"
          >
            Close others
          </MenuItem>
        )}
        {menuTab && (
          <MenuItem
            icon="last_page"
            disabled={!closableToTheRight}
            onClick={() => closingWith(() => tabsStore.closeTabsToTheRight(menuTab.id))}
            data-testid="close-dashboard-tabs-to-the-right"
          >
            Close tabs to the right
          </MenuItem>
        )}
      </Menu>

      {activeTab && (
        <Icon
          material="add"
          small
          className={styles.newTab}
          tooltip="New tab"
          data-testid="new-dashboard-tab"
          onClick={() => {
            const tab = tabsStore.openTab(activeTab.clusterId);

            navigateToClusterView(tab.clusterId);
          }}
        />
      )}
    </div>
  );
});

export const TabStrip = withInjectables<Dependencies>(NonInjectedTabStrip, {
  getProps: (di) => ({
    tabsStore: di.inject(dashboardTabsStoreInjectable),
    entityRegistry: di.inject(catalogEntityRegistryInjectable),
    navigateToClusterView: di.inject(navigateToClusterViewInjectable),
    navigateToCatalog: di.inject(navigateToCatalogInjectable),
  }),
});

TabStrip.displayName = "TabStrip";
