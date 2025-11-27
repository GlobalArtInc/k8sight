import { getInjectable } from "@ogre-tools/injectable";

const storeMigrationVersionInjectable = getInjectable({
  id: "store-migration-version",
  instantiate: () => "0.1.0",
});

export default storeMigrationVersionInjectable;
