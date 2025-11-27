import { daemonSetDetailsMetricsInjectionToken } from "@kubesightapp/metrics";
import { getInjectable } from "@ogre-tools/injectable";
import { ClusterMetricsResourceType } from "../../../../../common/cluster-types";
import { kubeObjectDetailItemInjectionToken } from "../kube-object-detail-item-injection-token";
import { getMetricsKubeObjectDetailItemInjectable } from "./get-metrics-kube-object-detail-item.injectable";

const daemonSetMetricsInjectable = getInjectable({
  id: "daemon-set-details-metrics",
  instantiate: (di) => {
    const getMetricsKubeObjectDetailItem = di.inject(getMetricsKubeObjectDetailItemInjectable);

    return getMetricsKubeObjectDetailItem(daemonSetDetailsMetricsInjectionToken, ClusterMetricsResourceType.DaemonSet);
  },
  injectionToken: kubeObjectDetailItemInjectionToken,
});

export default daemonSetMetricsInjectable;
