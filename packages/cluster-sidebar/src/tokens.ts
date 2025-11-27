import { getInjectionToken } from "@ogre-tools/injectable";

import type { StrictReactNode } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";

export interface SidebarItemRegistration {
  id?: undefined;
  parentId: string | null;
  title: StrictReactNode;
  onClick: () => void;
  getIcon?: () => StrictReactNode;
  isActive?: IComputedValue<boolean>;
  isVisible?: IComputedValue<boolean>;
  orderNumber: number;
}

export interface SidebarItemDeclaration {
  id: string;
  parentId: string | null;
  title: StrictReactNode;
  onClick: () => void;
  getIcon?: () => StrictReactNode;
  isActive: IComputedValue<boolean>;
  isVisible: IComputedValue<boolean>;
  children: SidebarItemDeclaration[];
}

export const sidebarItemInjectionToken = getInjectionToken<SidebarItemRegistration>({
  id: "sidebar-item-injection-token",
});
