import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { K8sightExtensionId } from "@kubesightapp/legacy-extensions";

export interface K8sightExtensionState {
  enabled?: boolean;
  name: string;
}

const enabledExtensionsStateInjectable = getInjectable({
  id: "enabled-extensions-state",
  instantiate: () => observable.map<K8sightExtensionId, K8sightExtensionState>(),
});

export default enabledExtensionsStateInjectable;
