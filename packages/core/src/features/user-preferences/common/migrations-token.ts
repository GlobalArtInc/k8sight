import { getInjectionToken } from "@ogre-tools/injectable";

import type { MigrationDeclaration } from "../../persistent-storage/common/migrations.injectable";

export const userPreferencesMigrationInjectionToken = getInjectionToken<MigrationDeclaration>({
  id: "user-preferences-migration-token",
});
