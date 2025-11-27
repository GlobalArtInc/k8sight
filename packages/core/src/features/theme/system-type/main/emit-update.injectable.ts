import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { systemThemeTypeUpdateChannel } from "../common/channels";

import type { SystemThemeType } from "../common/channels";

const emitSystemThemeTypeUpdateInjectable = getInjectable({
  id: "emit-system-theme-type-update",
  instantiate: (di) => {
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);

    return (type: SystemThemeType) => sendMessageToChannel(systemThemeTypeUpdateChannel, type);
  },
});

export default emitSystemThemeTypeUpdateInjectable;
