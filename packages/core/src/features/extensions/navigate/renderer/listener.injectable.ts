import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import extensionLoaderInjectable from "../../../../extensions/extension-loader/extension-loader.injectable";
import { navigateForExtensionChannel } from "../common/channel";

import type { LensRendererExtension } from "../../../../extensions/lens-renderer-extension";

const navigateForExtensionListenerInjectable = getMessageChannelListenerInjectable({
  channel: navigateForExtensionChannel,
  id: "renderer",
  getHandler: (di) => {
    const extensionLoader = di.inject(extensionLoaderInjectable);

    return ({ extId, pageId, params }) => {
      const extension = extensionLoader.getInstanceById(extId) as LensRendererExtension | undefined;

      if (extension) {
        extension.navigate(pageId, params);
      }
    };
  },
});

export default navigateForExtensionListenerInjectable;
