import { loggerInjectionToken } from "@kubesightapp/logger";
import { showErrorNotificationInjectable, showShortInfoNotificationInjectable } from "@kubesightapp/notifications";
import { getInjectable } from "@ogre-tools/injectable";
import extensionLoaderInjectable from "../../../extensions/extension-loader/extension-loader.injectable";
import isExtensionEnabledInjectable from "../../../features/extensions/enabled/common/is-enabled.injectable";
import { LensProtocolRouterRenderer } from "./lens-protocol-router-renderer";

const lensProtocolRouterRendererInjectable = getInjectable({
  id: "lens-protocol-router-renderer",

  instantiate: (di) =>
    new LensProtocolRouterRenderer({
      extensionLoader: di.inject(extensionLoaderInjectable),
      isExtensionEnabled: di.inject(isExtensionEnabledInjectable),
      logger: di.inject(loggerInjectionToken),
      showErrorNotification: di.inject(showErrorNotificationInjectable),
      showShortInfoNotification: di.inject(showShortInfoNotificationInjectable),
    }),
});

export default lensProtocolRouterRendererInjectable;
