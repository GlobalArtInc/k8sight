import { getGlobalOverride } from "@kubesightapp/test-utils";
import { reloadPageChannel } from "../common/channel";
import reloadPageChannelListenerInjectable from "./register-listener.injectable";

export default getGlobalOverride(reloadPageChannelListenerInjectable, () => ({
  id: "reload-page-channel-listener",
  channel: reloadPageChannel,
  handler: () => {},
}));
