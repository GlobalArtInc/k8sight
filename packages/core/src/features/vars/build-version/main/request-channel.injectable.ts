import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { buildVersionChannel, buildVersionInitializable } from "../common/token";

const buildVersionChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "build-version-channel-listener",
  channel: buildVersionChannel,
  getHandler: (di) => () => di.inject(buildVersionInitializable.stateToken),
});

export default buildVersionChannelListenerInjectable;
