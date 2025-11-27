import { byOrderNumber } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { shouldShowResourceInjectionToken } from "../../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import { workloadInjectionToken } from "./workload-injection-token";

const workloadsInjectable = getInjectable({
  id: "workloads",

  instantiate: (di) => {
    const workloads = di.injectMany(workloadInjectionToken);

    return computed(() =>
      workloads.filter((w) => di.inject(shouldShowResourceInjectionToken, w.resource).get()).sort(byOrderNumber),
    );
  },
});

export default workloadsInjectable;
