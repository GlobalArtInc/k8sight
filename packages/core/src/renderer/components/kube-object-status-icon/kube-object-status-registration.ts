import type { KubeObject } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";

import type { KubeObjectStatus } from "../../../common/k8s-api/kube-object-status";

export interface KubeObjectStatusRegistration {
  kind: string;
  apiVersions: string[];
  resolve: (object: KubeObject) => KubeObjectStatus;
  visible?: IComputedValue<boolean>;
}
