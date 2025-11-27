import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { ExtensionInstallationStateStore } from "./extension-installation-state-store";

const extensionInstallationStateStoreInjectable = getInjectable({
  id: "extension-installation-state-store",
  instantiate: (di) =>
    new ExtensionInstallationStateStore({
      logger: di.inject(loggerInjectionToken),
    }),
});

export default extensionInstallationStateStoreInjectable;
