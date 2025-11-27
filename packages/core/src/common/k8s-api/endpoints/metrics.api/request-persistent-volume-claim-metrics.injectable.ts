import { getInjectable } from "@ogre-tools/injectable";
import requestMetricsInjectable from "./request-metrics.injectable";

import type { PersistentVolumeClaim } from "@kubesightapp/kube-object";

import type { MetricData } from "../metrics.api";

export interface PersistentVolumeClaimMetricData {
  diskUsage: MetricData;
  diskCapacity: MetricData;
}

export type RequestPersistentVolumeClaimMetrics = (
  claim: PersistentVolumeClaim,
) => Promise<PersistentVolumeClaimMetricData>;

const requestPersistentVolumeClaimMetricsInjectable = getInjectable({
  id: "request-persistent-volume-claim-metrics",
  instantiate: (di): RequestPersistentVolumeClaimMetrics => {
    const requestMetrics = di.inject(requestMetricsInjectable);

    return (claim) => {
      const opts = { category: "pvc", pvc: claim.getName(), namespace: claim.getNs() };

      return requestMetrics(
        {
          diskUsage: opts,
          diskCapacity: opts,
        },
        {
          namespace: opts.namespace,
        },
      );
    };
  },
});

export default requestPersistentVolumeClaimMetricsInjectable;
