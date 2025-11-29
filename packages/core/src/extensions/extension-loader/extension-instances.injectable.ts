import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { K8sightExtensionId, LegacyK8sightExtension } from "@kubesightapp/legacy-extensions";

const extensionInstancesInjectable = getInjectable({
  id: "extension-instances",
  instantiate: () => observable.map<K8sightExtensionId, LegacyK8sightExtension>(),
});

export default extensionInstancesInjectable;
