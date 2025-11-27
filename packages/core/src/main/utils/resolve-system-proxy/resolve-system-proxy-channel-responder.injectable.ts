import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { resolveSystemProxyChannel } from "../../../common/utils/resolve-system-proxy/resolve-system-proxy-channel";
import resolveSystemProxyInjectable from "./resolve-system-proxy.injectable";

const resolveSystemProxyChannelResponderInjectable = getRequestChannelListenerInjectable({
  id: "resolve-system-proxy-channel-responder-listener",
  channel: resolveSystemProxyChannel,
  getHandler: (di) => di.inject(resolveSystemProxyInjectable),
});

export default resolveSystemProxyChannelResponderInjectable;
