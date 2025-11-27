import { getInjectionToken } from "@ogre-tools/injectable";

export interface IpcChannelPrefixes {
  readonly local: string;
  readonly remote: string;
}

export const persistentStorageIpcChannelPrefixesInjectionToken = getInjectionToken<IpcChannelPrefixes>({
  id: "persistent-storage-ipc-channel-prefix-token",
});
