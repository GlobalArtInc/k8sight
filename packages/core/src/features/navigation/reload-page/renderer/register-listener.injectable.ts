import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import { reloadPageChannel } from "../common/channel";

const reloadPageChannelListenerInjectable = getMessageChannelListenerInjectable({
  id: "handler",
  channel: reloadPageChannel,
  getHandler: () => () => location.reload(),
  causesSideEffects: true,
});

export default reloadPageChannelListenerInjectable;
