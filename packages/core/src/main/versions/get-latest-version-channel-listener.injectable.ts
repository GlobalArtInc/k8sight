import { loggerInjectionToken } from "@kubesightapp/logger";
import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import getLatestVersionInjectable from "../../common/utils/get-latest-version.injectable";
import { getLatestVersionChannel } from "../../common/utils/get-latest-version-channel";

const getLatestVersionChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "get-latest-version-channel-listener",
  channel: getLatestVersionChannel,
  getHandler: (di) => {
    const getLatestVersion = di.inject(getLatestVersionInjectable);
    const logger = di.inject(loggerInjectionToken);

    return async () => {
      try {
        return await getLatestVersion("@kubesightapp/core");
      } catch (error) {
        logger.error(`[GET-LATEST-VERSION]: Failed to fetch latest version`, { error });

        return undefined;
      }
    };
  },
});

export default getLatestVersionChannelListenerInjectable;
