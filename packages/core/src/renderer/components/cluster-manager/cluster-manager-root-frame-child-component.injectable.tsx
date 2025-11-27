import { ErrorBoundary } from "@kubesightapp/error-boundary";
import { rootFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import React from "react";
import { ClusterManager } from "./cluster-manager";

const clusterManagerRootFrameChildComponentInjectable = getInjectable({
  id: "cluster-manager-root-frame-child-component",

  instantiate: () => ({
    id: "cluster-manager",

    shouldRender: computed(() => true),

    Component: () => (
      <ErrorBoundary>
        <ClusterManager />
      </ErrorBoundary>
    ),
  }),

  injectionToken: rootFrameChildComponentInjectionToken,
});

export default clusterManagerRootFrameChildComponentInjectable;
