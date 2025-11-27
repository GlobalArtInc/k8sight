import { getInjectable } from "@ogre-tools/injectable";
import catalogEntityRegistryInjectable from "./registry.injectable";

const catalogEnitiesInjectable = getInjectable({
  id: "catalog-enities",
  instantiate: (di) => di.inject(catalogEntityRegistryInjectable).items,
});

export default catalogEnitiesInjectable;
