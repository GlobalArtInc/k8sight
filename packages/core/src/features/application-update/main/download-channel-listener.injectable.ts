import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { downloadApplicationUpdateChannel } from "../common/channels";
import applicationUpdaterInjectable from "./updater.injectable";

const downloadApplicationUpdateListenerInjectable = getRequestChannelListenerInjectable({
  id: "download-application-update-listener",
  channel: downloadApplicationUpdateChannel,

  /*
   * Resolves as soon as the download is over, but the renderer does not wait on it: progress and
   * the finished state arrive on the state channel.
   */
  getHandler: (di) => () => di.inject(applicationUpdaterInjectable).download(),
});

export default downloadApplicationUpdateListenerInjectable;
