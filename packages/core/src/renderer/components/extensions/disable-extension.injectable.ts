import { getInjectable } from "@ogre-tools/injectable";
import extensionLoaderInjectable from "../../../extensions/extension-loader/extension-loader.injectable";

import type { K8sightExtensionId } from "@kubesightapp/legacy-extensions";

export type DisableExtension = (extId: K8sightExtensionId) => void;

const disableExtensionInjectable = getInjectable({
  id: "disable-extension",

  instantiate: (di): DisableExtension => {
    const extensionLoader = di.inject(extensionLoaderInjectable);

    return (extId) => {
      const ext = extensionLoader.getExtensionById(extId);

      if (ext && !ext.isBundled) {
        ext.isEnabled = false;
      }
    };
  },
});

export default disableExtensionInjectable;
