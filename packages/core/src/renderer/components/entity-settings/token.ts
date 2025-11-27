import { getInjectionToken } from "@ogre-tools/injectable";

import type { RegisteredEntitySetting } from "./extension-registrator.injectable";

export const entitySettingInjectionToken = getInjectionToken<RegisteredEntitySetting>({
  id: "entity-setting",
});
