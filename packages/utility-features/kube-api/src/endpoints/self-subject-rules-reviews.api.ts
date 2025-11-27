import { SelfSubjectRulesReview } from "@kubesightapp/kube-object";
import { KubeApi } from "../kube-api";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class SelfSubjectRulesReviewApi extends KubeApi<SelfSubjectRulesReview> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      ...(opts ?? {}),
      objectConstructor: SelfSubjectRulesReview,
    });
  }

  create({ namespace = "default" }) {
    return super.create(
      {},
      {
        spec: {
          namespace,
        },
      },
    );
  }
}
