import { getInjectable } from "@ogre-tools/injectable";
import { extensionEntryPointNameInjectionToken } from "../../extensions/extension-loader/entry-point-name";

const extensionEntryPointNameInjectable = getInjectable({
  id: "extension-entry-point-name",
  instantiate: () => "main" as const,
  injectionToken: extensionEntryPointNameInjectionToken,
});

export default extensionEntryPointNameInjectable;
