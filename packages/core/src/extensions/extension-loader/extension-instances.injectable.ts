import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { LegacyK8sightExtension, K8sightExtensionId } from "@kubesightapp/legacy-extensions";

const extensionInstancesInjectable = getInjectable({
  id: "extension-instances",
  instantiate: () => observable.map<K8sightExtensionId, LegacyK8sightExtension>(),
});

export default extensionInstancesInjectable;
