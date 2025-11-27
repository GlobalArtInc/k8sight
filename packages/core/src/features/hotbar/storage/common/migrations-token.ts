import { getInjectionToken } from "@ogre-tools/injectable";

import type { MigrationDeclaration } from "../../../persistent-storage/common/migrations.injectable";

export const hotbarStoreMigrationInjectionToken = getInjectionToken<MigrationDeclaration>({
  id: "hotbar-store-migration-token",
});
