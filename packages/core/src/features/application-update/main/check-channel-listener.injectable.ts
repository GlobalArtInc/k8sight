import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { checkForApplicationUpdateChannel } from "../common/channels";
import applicationUpdaterInjectable from "./updater.injectable";

const checkForApplicationUpdateListenerInjectable = getRequestChannelListenerInjectable({
  id: "check-for-application-update-listener",
  channel: checkForApplicationUpdateChannel,

  getHandler: (di) => () => di.inject(applicationUpdaterInjectable).check(),
});

export default checkForApplicationUpdateListenerInjectable;
