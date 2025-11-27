import { getInjectable } from "@ogre-tools/injectable";
import { NotificationStatus } from "./notifications.store";
import { notificationsStoreInjectable } from "./notifications-store.injectable";

import type { ShowNotification } from "./notifications";

export const showErrorNotificationInjectable = getInjectable({
  id: "show-error-notification",

  instantiate: (di): ShowNotification => {
    const notificationsStore = di.inject(notificationsStoreInjectable);

    return (message, customOpts = {}) =>
      notificationsStore.add({
        status: NotificationStatus.ERROR,
        message,
        ...customOpts,
      });
  },
});
