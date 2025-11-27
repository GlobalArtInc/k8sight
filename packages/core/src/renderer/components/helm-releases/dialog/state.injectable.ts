import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { HelmRelease } from "../../../../common/k8s-api/endpoints/helm-releases.api";

const releaseRollbackDialogStateInjectable = getInjectable({
  id: "release-rollback-dialog-state",
  instantiate: () => observable.box<HelmRelease | undefined>(undefined),
});

export default releaseRollbackDialogStateInjectable;
