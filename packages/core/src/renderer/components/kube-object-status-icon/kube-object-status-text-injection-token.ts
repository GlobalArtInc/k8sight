import { getInjectionToken } from "@ogre-tools/injectable";

import type { KubeObject } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";

import type { KubeObjectStatus } from "../../../common/k8s-api/kube-object-status";

export interface KubeObjectStatusText {
  kind: string;
  apiVersions: string[];
  resolve: (object: KubeObject) => KubeObjectStatus | null;
  enabled: IComputedValue<boolean>;
}

export const kubeObjectStatusTextInjectionToken = getInjectionToken<KubeObjectStatusText>({
  id: "kube-object-status-text-injection-token",
});
