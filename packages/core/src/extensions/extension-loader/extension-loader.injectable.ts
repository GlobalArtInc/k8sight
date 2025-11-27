import { bundledExtensionInjectionToken } from "@kubesightapp/legacy-extensions";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import getDirnameOfPathInjectable from "../../common/path/get-dirname.injectable";
import joinPathsInjectable from "../../common/path/join-paths.injectable";
import updateExtensionsStateInjectable from "../../features/extensions/enabled/common/update-state.injectable";
import { extensionEntryPointNameInjectionToken } from "./entry-point-name";
import extensionInjectable from "./extension/extension.injectable";
import extensionInstancesInjectable from "./extension-instances.injectable";
import { ExtensionLoader } from "./extension-loader";

const extensionLoaderInjectable = getInjectable({
  id: "extension-loader",

  instantiate: (di) =>
    new ExtensionLoader({
      updateExtensionsState: di.inject(updateExtensionsStateInjectable),
      extensionInstances: di.inject(extensionInstancesInjectable),
      getExtension: (instance) => di.inject(extensionInjectable, instance),
      bundledExtensions: di.injectMany(bundledExtensionInjectionToken),
      extensionEntryPointName: di.inject(extensionEntryPointNameInjectionToken),
      logger: di.inject(loggerInjectionToken),
      joinPaths: di.inject(joinPathsInjectable),
      getDirnameOfPath: di.inject(getDirnameOfPathInjectable),
    }),
});

export default extensionLoaderInjectable;
