import { getRequestChannel } from "@kubesightapp/messaging";
import { getInitializable } from "../../../../common/initializable-state/create";

export const enabledExtensionsPersistentStorageVersionInitializable = getInitializable<string>(
  "enabled-extensions-persistent-storage-version",
);

export const enabledExtensionsPersistentStorageVersionChannel = getRequestChannel<void, string>(
  "enabled-extensions-persistent-storage-version",
);
