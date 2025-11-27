import { loggerInjectionToken } from "@kubesightapp/logger";
import { showErrorNotificationInjectable } from "@kubesightapp/notifications";
import { getInjectable } from "@ogre-tools/injectable";
import openLinkInBrowserInjectable from "../../common/utils/open-link-in-browser.injectable";
import { portForwardAddress } from "./port-forward-utils";

import type { ForwardedPort } from "./port-forward-item";

export type OpenPortForward = (portForward: ForwardedPort) => void;

const openPortForwardInjectable = getInjectable({
  id: "open-port-forward",
  instantiate: (di): OpenPortForward => {
    const openLinkInBrowser = di.inject(openLinkInBrowserInjectable);
    const showErrorNotification = di.inject(showErrorNotificationInjectable);
    const logger = di.inject(loggerInjectionToken);

    return (portForward) => {
      const browseTo = portForwardAddress(portForward);

      openLinkInBrowser(browseTo).catch((error) => {
        logger.error(`failed to open in browser: ${error}`, {
          port: portForward.port,
          kind: portForward.kind,
          namespace: portForward.namespace,
          name: portForward.name,
        });
        showErrorNotification(`Failed to open ${browseTo} in browser`);
      });
    };
  },
});

export default openPortForwardInjectable;
