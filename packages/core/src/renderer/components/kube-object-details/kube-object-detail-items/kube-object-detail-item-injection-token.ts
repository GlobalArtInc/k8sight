import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";
import type React from "react";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface KubeObjectDetailItem {
  Component: React.ElementType<KubeObjectDetailsProps<any>>;
  enabled: IComputedValue<boolean>;
  orderNumber: number;
}

export const kubeObjectDetailItemInjectionToken = getInjectionToken<KubeObjectDetailItem>({
  id: "kube-object-detail-item-injection-token",
});
