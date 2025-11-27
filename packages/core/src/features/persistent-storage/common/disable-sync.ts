import { getInjectionToken } from "@ogre-tools/injectable";

export const shouldPersistentStorageDisableSyncInIpcListenerInjectionToken = getInjectionToken<boolean>({
  id: "should-persistent-storage-disable-sync-in-ipc-listener-token",
});
