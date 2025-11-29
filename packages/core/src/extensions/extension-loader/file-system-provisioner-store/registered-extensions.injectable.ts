import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { K8sightExtensionId } from "@kubesightapp/legacy-extensions";

export const registeredExtensionsInjectable = getInjectable({
  id: "registered-extensions",
  instantiate: () => observable.map<K8sightExtensionId, string>(),
});
