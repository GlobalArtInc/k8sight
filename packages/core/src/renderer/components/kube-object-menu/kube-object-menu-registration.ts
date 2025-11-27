import type { KubeObject } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";
import type React from "react";

export interface KubeObjectMenuItemProps<Object extends KubeObject = KubeObject> {
  object: Object;
  toolbar?: boolean;
}

export interface KubeObjectMenuComponents<Props extends KubeObjectMenuItemProps = KubeObjectMenuItemProps> {
  MenuItem: React.ComponentType<Props>;
}

export interface KubeObjectMenuRegistration<Props extends KubeObjectMenuItemProps = any> {
  kind: string;
  apiVersions: string[];
  components: KubeObjectMenuComponents<Props>;
  visible?: IComputedValue<boolean>;
}
