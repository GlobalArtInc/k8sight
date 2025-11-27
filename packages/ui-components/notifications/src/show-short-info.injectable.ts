import { getInjectable } from "@ogre-tools/injectable";
import { showInfoNotificationInjectable } from "./show-info-notification.injectable";

import type { ShowNotification } from "./notifications";

export const showShortInfoNotificationInjectable = getInjectable({
  id: "show-short-info-notification",
  instantiate: (di): ShowNotification => {
    const showInfoNotification = di.inject(showInfoNotificationInjectable);

    return (message, customOpts = {}) => {
      return showInfoNotification(message, {
        timeout: 5_000,
        ...customOpts,
      });
    };
  },
});
