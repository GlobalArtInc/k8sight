import type { KubeStatusData } from "@kubesightapp/kube-object";

export type IKubeWatchEvent<T> =
  | {
      readonly type: "ADDED" | "MODIFIED" | "DELETED";
      readonly object: T;
    }
  | {
      readonly type: "ERROR";
      readonly object?: KubeStatusData;
    };
