import { getInjectionToken } from "@ogre-tools/injectable";

import type { KubeObject } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";
import type React from "react";

import type { KubeObjectMenuProps } from "./kube-object-menu";

export type KubeObjectMenuItemComponent = React.ElementType<KubeObjectMenuProps<KubeObject>>;

export interface KubeObjectMenuItem {
  kind: string;
  apiVersions: string[];
  enabled: IComputedValue<boolean>;
  Component: KubeObjectMenuItemComponent;
  orderNumber: number;
}

export const kubeObjectMenuItemInjectionToken = getInjectionToken<KubeObjectMenuItem>({
  id: "kube-object-menu-item-injection-token",
});
