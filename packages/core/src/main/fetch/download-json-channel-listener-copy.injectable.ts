import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { downloadJsonChannel } from "../../common/fetch/download-json-channel";
import downloadJsonInjectable from "./download-json.injectable";

const nodeFetchChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "download-json-channel-listener",
  channel: downloadJsonChannel,
  getHandler: (di) => {
    const downloadJson = di.inject(downloadJsonInjectable);
    return async ({ url, opts }) => {
      return await downloadJson(url, opts);
    };
  },
});

export default nodeFetchChannelListenerInjectable;
