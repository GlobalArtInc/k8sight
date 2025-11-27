import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { LegacyLensExtension, LensExtensionId } from "@kubesightapp/legacy-extensions";

const extensionInstancesInjectable = getInjectable({
  id: "extension-instances",
  instantiate: () => observable.map<LensExtensionId, LegacyLensExtension>(),
});

export default extensionInstancesInjectable;
