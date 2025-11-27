import { getInjectionToken } from "@ogre-tools/injectable";

import type { GeneralEntity } from "../index";

export const generalCatalogEntityInjectionToken = getInjectionToken<GeneralEntity>({
  id: "general-catalog-entity-injection-token",
});
