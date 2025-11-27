import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import operatingSystemThemeInjectable from "../../../../main/theme/operating-system-theme.injectable";
import { initialSystemThemeTypeChannel } from "../common/channels";

const initialSystemThemeTypeHandler = getRequestChannelListenerInjectable({
  id: "initial-system-theme-type-listener",
  channel: initialSystemThemeTypeChannel,
  getHandler: (di) => {
    const operatingSystemTheme = di.inject(operatingSystemThemeInjectable);

    return () => operatingSystemTheme.get();
  },
});

export default initialSystemThemeTypeHandler;
