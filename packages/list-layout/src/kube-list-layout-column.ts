import type { KubeObject } from "@kubesightapp/kube-object";
import type { StrictReactNode } from "@kubesightapp/utilities";

import type { SearchFilter, TableCellProps, TableSortCallback } from "./list-layout-column";

export interface BaseKubeObjectListLayoutColumn<K extends KubeObject> {
  id: string;
  priority: number;
  sortingCallBack?: TableSortCallback<K>;
  searchFilter?: SearchFilter<K>;
  header: TableCellProps | undefined | null;
  content: (item: K) => StrictReactNode | TableCellProps;
}

export interface GeneralKubeObjectListLayoutColumn extends BaseKubeObjectListLayoutColumn<KubeObject> {
  kind: string;
  apiVersion: string | string[];
}

export interface SpecificKubeListLayoutColumn<K extends KubeObject> extends BaseKubeObjectListLayoutColumn<K> {}
