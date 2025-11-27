import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";
export interface SyncBox<Value> {
  id: string;
  value: IComputedValue<Value>;
  set: (value: Value) => void;
}

export const syncBoxInjectionToken = getInjectionToken<SyncBox<any>>({
  id: "sync-box",
});
