import { getInjectionToken } from "@ogre-tools/injectable";

import type { MigrationDeclaration } from "../../../persistent-storage/common/migrations.injectable";

export const clusterStoreMigrationInjectionToken = getInjectionToken<MigrationDeclaration>({
  id: "cluster-store-migration",
});
