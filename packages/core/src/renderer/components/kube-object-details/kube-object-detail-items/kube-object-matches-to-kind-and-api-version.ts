import type { KubeObject } from "@kubesightapp/kube-object";

export const kubeObjectMatchesToKindAndApiVersion =
  (kind: string, apiVersions: string[]) =>
  <TKubeObject extends KubeObject>(item: TKubeObject | undefined) =>
    !!item && item.kind === kind && apiVersions.includes(item.apiVersion);
