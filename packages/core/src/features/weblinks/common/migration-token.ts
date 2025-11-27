import { getInjectionToken } from "@ogre-tools/injectable";

import type { MigrationDeclaration } from "../../persistent-storage/common/migrations.injectable";

export const weblinkStoreMigrationInjectionToken = getInjectionToken<MigrationDeclaration>({
  id: "weblink-store-migration-token",
});
