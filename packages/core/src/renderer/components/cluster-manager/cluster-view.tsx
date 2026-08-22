import "./cluster-view.scss";

import { withInjectables } from "@ogre-tools/injectable-react";
import { computed, makeObservable, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import React from "react";
import navigateToCatalogInjectable from "../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import requestClusterActivationInjectable from "../../../features/cluster/activation/renderer/request-activation.injectable";
import getClusterByIdInjectable from "../../../features/cluster/storage/common/get-by-id.injectable";
import frameCommandsInjectable from "../../../features/dashboard-tabs/renderer/frame-commands.injectable";
import dashboardTabsStoreInjectable from "../../../features/dashboard-tabs/renderer/tabs-store.injectable";
import catalogEntityRegistryInjectable from "../../api/catalog/entity/registry.injectable";
import clusterFrameHandlerInjectable from "./cluster-frame-handler.injectable";
import { ClusterStatus } from "./cluster-status";
import clusterViewRouteParametersInjectable from "./cluster-view-route-parameters.injectable";

import type { StrictReactNode } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";

import type { Cluster } from "../../../common/cluster/cluster";
import type { NavigateToCatalog } from "../../../common/front-end-routing/routes/catalog/navigate-to-catalog.injectable";
import type { RequestClusterActivation } from "../../../features/cluster/activation/common/request-token";
import type { GetClusterById } from "../../../features/cluster/storage/common/get-by-id.injectable";
import type { FrameCommands } from "../../../features/dashboard-tabs/renderer/frame-commands.injectable";
import type { DashboardTabsStore } from "../../../features/dashboard-tabs/renderer/tabs-store.injectable";
import type { CatalogEntityRegistry } from "../../api/catalog/entity/registry";
import type { ClusterFrameHandler } from "./cluster-frame-handler";

interface Dependencies {
  clusterId: IComputedValue<string>;
  clusterFrames: ClusterFrameHandler;
  navigateToCatalog: NavigateToCatalog;
  entityRegistry: CatalogEntityRegistry;
  getClusterById: GetClusterById;
  requestClusterActivation: RequestClusterActivation;
  tabsStore: DashboardTabsStore;
  frameCommands: FrameCommands;
}

@observer
class NonInjectedClusterView extends React.Component<Dependencies> {
  constructor(props: Dependencies) {
    super(props);
    makeObservable(this);
  }

  get clusterId() {
    return this.props.clusterId.get();
  }

  @computed get cluster(): Cluster | undefined {
    return this.props.getClusterById(this.clusterId);
  }

  /**
   * The tab whose frame this view is showing. The route only says which cluster is on screen; with
   * several tabs open on one cluster, the store is what says which of them is focused.
   */
  @computed get activeTab() {
    const tab = this.props.tabsStore.activeTab.get();

    return tab?.clusterId === this.clusterId ? tab : undefined;
  }

  private readonly isViewLoaded = computed(
    () => {
      const tab = this.activeTab;

      return Boolean(tab && this.props.clusterFrames.hasLoadedView(tab.id));
    },
    {
      keepAlive: true,
      requiresReaction: true,
    },
  );

  @computed get isReady(): boolean {
    const { cluster } = this;

    if (!cluster) {
      return false;
    }

    return cluster.ready.get() && cluster.available.get() && this.isViewLoaded.get();
  }

  componentDidMount() {
    this.bindEvents();
  }

  componentWillUnmount() {
    this.props.clusterFrames.clearVisibleTab();
    this.props.entityRegistry.activeEntity = undefined;
  }

  bindEvents() {
    disposeOnUnmount(this, [
      reaction(
        () => ({ clusterId: this.clusterId, activeTabId: this.props.tabsStore.activeTab.get()?.id }),
        async ({ clusterId }) => {
          // TODO: replace with better handling
          if (!clusterId) {
            return;
          }

          if (!this.props.entityRegistry.getById(clusterId)) {
            return this.props.navigateToCatalog(); // redirect to catalog when the clusterId does not correspond to an entity
          }

          // Arriving from elsewhere -- the hotbar, the catalog -- there may be no tab for this
          // cluster yet, or the focused one may belong to another cluster. Settling that re-runs
          // this reaction with a tab in hand.
          const tab = this.activeTab ?? this.props.tabsStore.focusOrOpenForCluster(clusterId);

          if (tab.clusterId !== clusterId) {
            return;
          }

          // A rebuilt frame boots on its own start page, so a tab restored from a previous
          // session has to be steered back to the page it remembers.
          if (!this.props.clusterFrames.hasView(tab.id) && tab.path) {
            this.props.frameCommands.request(tab.id, {
              message: { kind: "k8sight:navigate", path: tab.path },
              isSatisfied: (state) => state.path === tab.path,
            });
          }

          this.props.clusterFrames.initView(tab);
          this.props.clusterFrames.setVisibleTab(tab.id);
          this.props.requestClusterActivation({ clusterId });
          this.props.entityRegistry.activeEntity = clusterId;
        },
        {
          fireImmediately: true,
          equals: (a, b) => a.clusterId === b.clusterId && a.activeTabId === b.activeTabId,
        },
      ),
    ]);
  }

  renderStatus(): StrictReactNode {
    const { cluster, isReady } = this;

    if (cluster && !isReady) {
      return <ClusterStatus cluster={cluster} className="box center" />;
    }

    return null;
  }

  render() {
    return <div className="ClusterView flex column align-center">{this.renderStatus()}</div>;
  }
}

export const ClusterView = withInjectables<Dependencies>(NonInjectedClusterView, {
  getProps: (di) => ({
    ...di.inject(clusterViewRouteParametersInjectable),
    navigateToCatalog: di.inject(navigateToCatalogInjectable),
    clusterFrames: di.inject(clusterFrameHandlerInjectable),
    entityRegistry: di.inject(catalogEntityRegistryInjectable),
    getClusterById: di.inject(getClusterByIdInjectable),
    requestClusterActivation: di.inject(requestClusterActivationInjectable),
    tabsStore: di.inject(dashboardTabsStoreInjectable),
    frameCommands: di.inject(frameCommandsInjectable),
  }),
});
