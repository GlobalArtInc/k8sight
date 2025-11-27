import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { LensExtensionId } from "@kubesightapp/legacy-extensions";

export const registeredExtensionsInjectable = getInjectable({
  id: "registered-extensions",
  instantiate: () => observable.map<LensExtensionId, string>(),
});
