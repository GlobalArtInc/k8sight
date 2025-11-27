import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { listHelmReleasesChannel } from "../common/channels";

import type { ChannelRequester } from "@kubesightapp/messaging";

export type RequestListHelmReleases = ChannelRequester<typeof listHelmReleasesChannel>;

const requestListHelmReleasesInjectable = getInjectable({
  id: "request-list-helm-releases",
  instantiate: (di): RequestListHelmReleases => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return (args) => requestFromChannel(listHelmReleasesChannel, args);
  },
});

export default requestListHelmReleasesInjectable;
