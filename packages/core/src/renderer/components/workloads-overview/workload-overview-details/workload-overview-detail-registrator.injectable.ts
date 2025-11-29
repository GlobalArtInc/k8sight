import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { extensionRegistratorInjectionToken } from "../../../../extensions/extension-loader/extension-registrator-injection-token";
import extensionShouldBeEnabledForClusterFrameInjectable from "../../../extension-loader/extension-should-be-enabled-for-cluster-frame.injectable";
import { workloadOverviewDetailInjectionToken } from "./workload-overview-detail-injection-token";

import type { K8sightRendererExtension } from "../../../../extensions/k8sight-renderer-extension";

const workloadOverviewDetailRegistratorInjectable = getInjectable({
  id: "workload-overview-detail-registrator",

  instantiate: (di) => {
    const getRandomId = di.inject(getRandomIdInjectionToken);

    return (ext) => {
      const extension = ext as K8sightRendererExtension;
      const extensionShouldBeEnabledForClusterFrame = di.inject(
        extensionShouldBeEnabledForClusterFrameInjectable,
        extension,
      );

      return extension.kubeWorkloadsOverviewItems.map((registration) =>
        getInjectable({
          id: `workload-overview-detail-from-${extension.sanitizedExtensionId}-${getRandomId()}`,

          instantiate: () => ({
            Component: registration.components.Details,

            enabled: computed(() => {
              if (!extensionShouldBeEnabledForClusterFrame.value.get()) {
                return false;
              }

              return registration.visible ? registration.visible.get() : true;
            }),

            orderNumber: 0.5 + (registration.priority ? 100 - registration.priority : 50),
          }),

          injectionToken: workloadOverviewDetailInjectionToken,
        }),
      );
    };
  },

  injectionToken: extensionRegistratorInjectionToken,
});

export default workloadOverviewDetailRegistratorInjectable;
