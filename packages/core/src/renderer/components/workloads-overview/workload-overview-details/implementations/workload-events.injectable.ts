import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { WorkloadEvents } from "../../../../initializers/workload-events";
import { workloadOverviewDetailInjectionToken } from "../workload-overview-detail-injection-token";

const workloadEventsInjectable = getInjectable({
  id: "workload-events",

  instantiate: () => ({
    Component: WorkloadEvents,
    enabled: computed(() => true),
    orderNumber: 300,
  }),

  injectionToken: workloadOverviewDetailInjectionToken,
});

export default workloadEventsInjectable;
