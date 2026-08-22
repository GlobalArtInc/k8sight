import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { installApplicationUpdateChannel } from "../common/channels";
import applicationUpdaterInjectable from "./updater.injectable";

const installApplicationUpdateListenerInjectable = getRequestChannelListenerInjectable({
  id: "install-application-update-listener",
  channel: installApplicationUpdateChannel,

  // Never returns in practice: the app is torn down while the installer takes over.
  getHandler: (di) => () => di.inject(applicationUpdaterInjectable).install(),
});

export default installApplicationUpdateListenerInjectable;
