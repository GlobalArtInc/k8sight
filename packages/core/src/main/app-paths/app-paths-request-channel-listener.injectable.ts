import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import appPathsInjectable from "../../common/app-paths/app-paths.injectable";
import { appPathsChannel } from "../../common/app-paths/app-paths-channel";

const appPathsRequestChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "app-paths-request-channel-listener",
  channel: appPathsChannel,
  getHandler: (di) => {
    const appPaths = di.inject(appPathsInjectable);

    return () => appPaths;
  },
});

export default appPathsRequestChannelListenerInjectable;
