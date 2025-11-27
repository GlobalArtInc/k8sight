import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { getLatestVersionChannel } from "../../../common/utils/get-latest-version-channel";

const getLatestVersionViaChannelInjectable = getInjectable({
  id: "get-latest-version-via-channel",

  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return async (): Promise<string | undefined> => {
      return requestFromChannel(getLatestVersionChannel);
    };
  },
});

export default getLatestVersionViaChannelInjectable;
