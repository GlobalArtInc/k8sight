import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import {
  enabledExtensionsPersistentStorageVersionChannel,
  enabledExtensionsPersistentStorageVersionInitializable,
} from "../common/storage-version";

const enabledExtensionsPersistentStorageVersionChannelHandler = getRequestChannelListenerInjectable({
  id: "enabled-extensions-persistent-storage-version-handler",
  channel: enabledExtensionsPersistentStorageVersionChannel,
  getHandler: (di) => {
    const version = di.inject(enabledExtensionsPersistentStorageVersionInitializable.stateToken);

    return () => version;
  },
});

export default enabledExtensionsPersistentStorageVersionChannelHandler;
