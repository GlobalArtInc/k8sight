import { IngressClass } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { KubeApiDependencies, ResourceDescriptor } from "../kube-api";

export class IngressClassApi extends KubeApi<IngressClass> {
  constructor(dependencies: KubeApiDependencies) {
    super(dependencies, {
      objectConstructor: IngressClass,
      checkPreferredVersion: true,
      fallbackApiBases: ["/apis/extensions/v1beta1/ingressclasses"],
    });
  }

  setAsDefault({ name }: ResourceDescriptor, isDefault = true) {
    return this.patch(
      { name },
      {
        metadata: {
          annotations: {
            [IngressClass.ANNOTATION_IS_DEFAULT]: String(isDefault),
          },
        },
      },
      "strategic",
    );
  }
}
