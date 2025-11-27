import { getInjectable } from "@ogre-tools/injectable";
import extensionApiVersionInjectable from "../../../common/vars/extension-api-version.injectable";
import { isCompatibleExtension } from "./is-compatible-extension";

const isCompatibleExtensionInjectable = getInjectable({
  id: "is-compatible-extension",
  instantiate: (di) =>
    isCompatibleExtension({
      extensionApiVersion: di.inject(extensionApiVersionInjectable),
    }),
});

export default isCompatibleExtensionInjectable;
