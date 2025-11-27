import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { LensExtensionId } from "@kubesightapp/legacy-extensions";

export interface LensExtensionState {
  enabled?: boolean;
  name: string;
}

const enabledExtensionsStateInjectable = getInjectable({
  id: "enabled-extensions-state",
  instantiate: () => observable.map<LensExtensionId, LensExtensionState>(),
});

export default enabledExtensionsStateInjectable;
