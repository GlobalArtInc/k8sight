import { loggerInjectionToken } from "@kubesightapp/logger";
import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import {
  applicationUpdateStateChannel,
  checkForApplicationUpdateChannel,
} from "../../../features/application-update/common/channels";
import showApplicationUpdateNotificationInjectable from "../../../features/application-update/renderer/show-update-notification.injectable";

/**
 * Opening the Welcome page is the one moment the user is plainly not busy, so it is where a check
 * is nudged along.
 *
 * The result is not awaited here: main pushes every state change to the renderer, and the listener
 * in the application-update feature is what actually raises the notification. This only catches up
 * with whatever main already knows, for a frame that started after the last push.
 */
const newVersionNotificationInjectable = getInjectable({
  id: "new-version-notification",

  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);
    const showApplicationUpdateNotification = di.inject(showApplicationUpdateNotificationInjectable);
    const logger = di.inject(loggerInjectionToken);

    return async () => {
      try {
        showApplicationUpdateNotification(await requestFromChannel(applicationUpdateStateChannel));

        await requestFromChannel(checkForApplicationUpdateChannel);
      } catch (error) {
        logger.warn(`[WELCOME]: Failed to check for updates: ${error}`);
      }
    };
  },
});

export default newVersionNotificationInjectable;
