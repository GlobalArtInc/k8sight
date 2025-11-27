import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { getHelmReleaseChannel } from "../common/channels";

import type { ChannelRequester } from "@kubesightapp/messaging";

export type RequestHelmRelease = ChannelRequester<typeof getHelmReleaseChannel>;

const requestHelmReleaseInjectable = getInjectable({
  id: "request-helm-release",
  instantiate: (di): RequestHelmRelease => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return (args) => requestFromChannel(getHelmReleaseChannel, args);
  },
});

export default requestHelmReleaseInjectable;
