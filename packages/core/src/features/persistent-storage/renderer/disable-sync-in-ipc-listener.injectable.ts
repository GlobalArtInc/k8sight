import { getInjectable } from "@ogre-tools/injectable";
import { shouldPersistentStorageDisableSyncInIpcListenerInjectionToken } from "../common/disable-sync";

const shouldBaseStoreDisableSyncInIpcListenerInjectable = getInjectable({
  id: "should-base-store-disable-sync-in-ipc-listener",
  instantiate: () => true,
  injectionToken: shouldPersistentStorageDisableSyncInIpcListenerInjectionToken,
});

export default shouldBaseStoreDisableSyncInIpcListenerInjectable;
