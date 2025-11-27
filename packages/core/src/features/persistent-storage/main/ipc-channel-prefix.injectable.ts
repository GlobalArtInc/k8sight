import { getInjectable } from "@ogre-tools/injectable";
import { persistentStorageIpcChannelPrefixesInjectionToken } from "../common/channel-prefix";

const baseStoreIpcChannelPrefixInjectable = getInjectable({
  id: "base-store-ipc-channel-prefix",
  instantiate: () => ({
    local: "store-sync-main",
    remote: "store-sync-renderer",
  }),
  injectionToken: persistentStorageIpcChannelPrefixesInjectionToken,
});

export default baseStoreIpcChannelPrefixInjectable;
