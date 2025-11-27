import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";

export interface ClusterFrameChildComponent {
  id: string;
  Component: React.ElementType;
  shouldRender: IComputedValue<boolean>;
}

export const clusterFrameChildComponentInjectionToken = getInjectionToken<ClusterFrameChildComponent>({
  id: "cluster-frame-child-component",
});
