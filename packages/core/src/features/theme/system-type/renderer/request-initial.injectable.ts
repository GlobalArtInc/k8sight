import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { initialSystemThemeTypeChannel } from "../common/channels";

import type { RequestChannelHandler } from "@kubesightapp/messaging";

export type RequestInitialSystemThemeType = RequestChannelHandler<typeof initialSystemThemeTypeChannel>;

const requestInitialSystemThemeTypeInjectable = getInjectable({
  id: "request-initial-system-theme-type",
  instantiate: (di): RequestInitialSystemThemeType => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return () => requestFromChannel(initialSystemThemeTypeChannel);
  },
});

export default requestInitialSystemThemeTypeInjectable;
