import type { IconProps } from "@kubesightapp/icon";
import type { StrictReactNode } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";
import type React from "react";

import type { PageTarget } from "../../routes/page-registration";

export interface ClusterPageMenuRegistration {
  id?: string;
  parentId?: string;
  target?: PageTarget;
  title: StrictReactNode;
  components: ClusterPageMenuComponents;
  visible?: IComputedValue<boolean>;
  orderNumber?: number;
}

export interface ClusterPageMenuComponents {
  Icon?: React.ComponentType<IconProps> | null | undefined;
}
