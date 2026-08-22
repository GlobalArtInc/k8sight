import { sidebarItemsInjectable } from "@kubesightapp/cluster-sidebar";
import { Icon } from "@kubesightapp/icon";
import { cssNames } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { autorun, runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { KubernetesCluster } from "../../../common/catalog-entities";
import clusterNavigationInjectable from "../../../features/dashboard-tabs/renderer/cluster-navigation.injectable";
import expandedClustersInjectable from "../../../features/dashboard-tabs/renderer/expanded-clusters.injectable";
import catalogEntityRegistryInjectable from "../../api/catalog/entity/registry.injectable";
import clusterFrameHandlerInjectable from "../cluster-manager/cluster-frame-handler.injectable";
import styles from "./navigator.module.scss";
import { NavigatorItem } from "./navigator-item";
import { buildNavigatorNodes } from "./navigator-nodes";

import type { SidebarItemDeclaration } from "@kubesightapp/cluster-sidebar";

import type { IComputedValue, ObservableSet } from "mobx";

import type { ClusterNavigation } from "../../../features/dashboard-tabs/renderer/cluster-navigation.injectable";
import type { CatalogEntityRegistry } from "../../api/catalog/entity/registry";
import type { CatalogEntity } from "../../api/catalog-entity";
import type { ClusterFrameHandler } from "../cluster-manager/cluster-frame-handler";

interface Dependencies {
  entityRegistry: CatalogEntityRegistry;
  sidebarItems: IComputedValue<SidebarItemDeclaration[]>;
  clusterNavigation: ClusterNavigation;
  expandedClusters: ObservableSet<string>;
  clusterFrames: ClusterFrameHandler;
}

const sourceLabels: Record<string, string> = {
  local: "Local Kubeconfigs",
};

const labelForSource = (source: string) => sourceLabels[source] ?? source;

const NonInjectedNavigator = observer(
  ({ entityRegistry, sidebarItems, clusterNavigation, expandedClusters, clusterFrames }: Dependencies) => {
    const [search, setSearch] = useState("");
    const query = search.trim().toLowerCase();

    /**
     * Makes sure every unfolded cluster has a frame to describe it.
     *
     * This has to wait for the navigator to be mounted: frames are appended to a container the app
     * only renders once it is on screen, so raising one any earlier fails. It covers the cluster
     * whose tab was closed or evicted, and the tabs restored from the previous session, which are
     * unfolded before anything has been drawn.
     */
    useEffect(
      () =>
        autorun(() => {
          for (const clusterId of expandedClusters) {
            if (!clusterFrames.hasViewForCluster(clusterId)) {
              clusterNavigation.reveal(clusterId);
            }
          }
        }),
      [],
    );

    const clusters = entityRegistry
      .getItemsForApiKind<CatalogEntity>(KubernetesCluster.apiVersion, "KubernetesCluster")
      .filter((entity) => entity.getName().toLowerCase().includes(query));

    const bySource = new Map<string, CatalogEntity[]>();

    for (const entity of clusters) {
      const source = entity.metadata.source ?? "unknown";

      bySource.set(source, [...(bySource.get(source) ?? []), entity]);
    }

    const toggleCluster = (clusterId: string, isExpanded: boolean) => {
      runInAction(() => {
        if (isExpanded) {
          expandedClusters.delete(clusterId);
          clusterNavigation.conceal(clusterId);
        } else {
          expandedClusters.add(clusterId);
          clusterNavigation.reveal(clusterId);
        }
      });
    };

    return (
      <div className={styles.navigator} data-testid="navigator">
        <div className={styles.header}>Navigator</div>

        <div className={styles.searchRow}>
          <Icon material="search" small className={styles.searchIcon} />
          <input
            className={styles.search}
            placeholder="Search clusters..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            data-testid="navigator-search"
          />
        </div>

        <div className={styles.tree}>
          {[...bySource.entries()].map(([source, entities]) => (
            <div key={source} className={styles.group}>
              <div className={styles.groupLabel}>{labelForSource(source)}</div>

              {entities.map((entity) => {
                const clusterId = entity.getId();
                const isExpanded = expandedClusters.has(clusterId);
                const state = clusterNavigation.stateFor(clusterId).get();

                return (
                  <div key={clusterId} className={styles.cluster}>
                    <button
                      type="button"
                      className={styles.clusterRow}
                      onClick={() => toggleCluster(clusterId, isExpanded)}
                      title={entity.getName()}
                      data-testid={`navigator-cluster-${clusterId}`}
                    >
                      <Icon material={isExpanded ? "expand_more" : "chevron_right"} small className={styles.chevron} />
                      <span className={styles.clusterName}>{entity.getName()}</span>
                      <span
                        className={cssNames(styles.status, {
                          [styles.connected]: entity.status?.phase === "connected",
                        })}
                      />
                    </button>

                    {isExpanded &&
                      (state ? (
                        buildNavigatorNodes(sidebarItems.get(), state).map((item) => (
                          <NavigatorItem
                            key={item.id}
                            clusterId={clusterId}
                            item={item}
                            state={state}
                            depth={1}
                            onSelect={(itemId) => clusterNavigation.openItem(clusterId, itemId)}
                          />
                        ))
                      ) : (
                        <div className={styles.connecting}>Connecting…</div>
                      ))}
                  </div>
                );
              })}
            </div>
          ))}

          {clusters.length === 0 && <div className={styles.connecting}>No clusters found</div>}
        </div>
      </div>
    );
  },
);

export const Navigator = withInjectables<Dependencies>(NonInjectedNavigator, {
  getProps: (di) => ({
    entityRegistry: di.inject(catalogEntityRegistryInjectable),
    sidebarItems: di.inject(sidebarItemsInjectable),
    clusterNavigation: di.inject(clusterNavigationInjectable),
    clusterFrames: di.inject(clusterFrameHandlerInjectable),
    expandedClusters: di.inject(expandedClustersInjectable),
  }),
});

Navigator.displayName = "Navigator";
