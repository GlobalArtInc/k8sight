import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { applicationUpdateStateChannel } from "../common/channels";
import applicationUpdaterInjectable from "./updater.injectable";

const applicationUpdateStateListenerInjectable = getRequestChannelListenerInjectable({
  id: "application-update-state-listener",
  channel: applicationUpdateStateChannel,

  getHandler: (di) => () => di.inject(applicationUpdaterInjectable).state,
});

export default applicationUpdateStateListenerInjectable;
