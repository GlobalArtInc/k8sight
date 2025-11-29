import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import broadcastMessageInjectable from "../../../common/ipc/broadcast-message.injectable";
import extensionLoaderInjectable from "../../../extensions/extension-loader/extension-loader.injectable";
import isExtensionEnabledInjectable from "../../../features/extensions/enabled/common/is-enabled.injectable";
import showApplicationWindowInjectable from "../../start-main-application/k8sight-window/show-application-window.injectable";
import { K8sightProtocolRouterMain } from "./k8sight-protocol-router-main";

const k8sightProtocolRouterMainInjectable = getInjectable({
  id: "k8sight-protocol-router-main",

  instantiate: (di) =>
    new K8sightProtocolRouterMain({
      extensionLoader: di.inject(extensionLoaderInjectable),
      isExtensionEnabled: di.inject(isExtensionEnabledInjectable),
      showApplicationWindow: di.inject(showApplicationWindowInjectable),
      broadcastMessage: di.inject(broadcastMessageInjectable),
      logger: di.inject(loggerInjectionToken),
    }),
});

export default k8sightProtocolRouterMainInjectable;
