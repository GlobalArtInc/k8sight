import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import systemThemeConfigurationInjectable from "../../../../renderer/themes/system-theme.injectable";
import { systemThemeTypeUpdateChannel } from "../common/channels";

const systemThemeTypeUpdateListenerInjectable = getMessageChannelListenerInjectable({
  channel: systemThemeTypeUpdateChannel,
  id: "main",
  getHandler: (di) => {
    const systemThemeConfiguration = di.inject(systemThemeConfigurationInjectable);

    return (type) => systemThemeConfiguration.set(type);
  },
});

export default systemThemeTypeUpdateListenerInjectable;
