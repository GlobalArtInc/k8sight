import { JsonApiErrorParsed } from "@kubesightapp/json-api";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { showErrorNotificationInjectable } from "./show-error-notification.injectable";

import type { Disposer } from "@kubesightapp/utilities";

import type { CreateNotificationOptions } from "./notifications.store";

export type ShowCheckedErrorNotification = (
  message: unknown,
  fallback: string,
  opts?: CreateNotificationOptions,
) => Disposer;

export const showCheckedErrorNotificationInjectable = getInjectable({
  id: "show-checked-error-notififcation",
  instantiate: (di): ShowCheckedErrorNotification => {
    const showErrorNotification = di.inject(showErrorNotificationInjectable);
    const logger = di.inject(loggerInjectionToken);

    return (message, fallback, opts) => {
      if (typeof message === "string" || message instanceof Error || message instanceof JsonApiErrorParsed) {
        return showErrorNotification(message, opts);
      }

      logger.warn("[NOTIFICATIONS]: Unknown notification error message, falling back to default", message);

      return showErrorNotification(fallback, opts);
    };
  },
});
