import type { KubeObject, KubeObjectMetadata, KubeObjectScope } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";
import type React from "react";

import type { KubeObjectDetailsProps } from "./kube-object-details";
export interface KubeObjectDetailComponents<T extends KubeObject = KubeObject> {
  Details: React.ComponentType<KubeObjectDetailsProps<T>>;
}
export interface KubeObjectDetailRegistration<
  T extends KubeObject = KubeObject<KubeObjectMetadata<KubeObjectScope>, any, any>,
> {
  kind: string;
  apiVersions: string[];
  components: KubeObjectDetailComponents<T>;
  priority?: number;
  visible?: IComputedValue<boolean>;
}
