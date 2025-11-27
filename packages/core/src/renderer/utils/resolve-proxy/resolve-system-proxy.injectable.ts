import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { resolveSystemProxyChannel } from "../../../common/utils/resolve-system-proxy/resolve-system-proxy-channel";
import { resolveSystemProxyInjectionToken } from "../../../common/utils/resolve-system-proxy/resolve-system-proxy-injection-token";

const resolveSystemProxyInjectable = getInjectable({
  id: "resolve-system-proxy-for-renderer",

  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return async (url) => requestFromChannel(resolveSystemProxyChannel, url);
  },

  injectionToken: resolveSystemProxyInjectionToken,
});

export default resolveSystemProxyInjectable;
