import { getInjectionToken } from "@ogre-tools/injectable";

import type { MigrationDeclaration } from "../../../persistent-storage/common/migrations.injectable";

export const enabledExtensionsMigrationDeclarationInjectionToken = getInjectionToken<MigrationDeclaration>({
  id: "enabled-extensions-migration-declaration",
});
