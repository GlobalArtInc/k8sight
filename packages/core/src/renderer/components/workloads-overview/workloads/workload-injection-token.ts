import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";

import type { KubeApiResourceDescriptor } from "../../../../common/rbac";
import type { WorkloadStatus } from "../overview-workload-status";

export interface Workload {
  resource: KubeApiResourceDescriptor;
  open: () => void;
  amountOfItems: IComputedValue<number>;
  status: IComputedValue<WorkloadStatus>;
  title: string;
  orderNumber: number;
}

export const workloadInjectionToken = getInjectionToken<Workload>({
  id: "workload-injection-token",
});
