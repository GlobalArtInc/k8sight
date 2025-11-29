import { getInjectable } from "@ogre-tools/injectable";
import extensionLoaderInjectable from "../../../extensions/extension-loader/extension-loader.injectable";

import type { K8sightExtensionId } from "@kubesightapp/legacy-extensions";

export type EnableExtension = (extId: K8sightExtensionId) => void;

const enableExtensionInjectable = getInjectable({
  id: "enable-extension",

  instantiate: (di): EnableExtension => {
    const extensionLoader = di.inject(extensionLoaderInjectable);

    return (extId) => {
      const ext = extensionLoader.getExtensionById(extId);

      if (ext && !ext.isBundled) {
        ext.isEnabled = true;
      }
    };
  },
});

export default enableExtensionInjectable;
