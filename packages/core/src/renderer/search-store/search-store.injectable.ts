import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { SearchStore } from "./search-store";

const searchStoreInjectable = getInjectable({
  id: "search-store",
  instantiate: () => new SearchStore(),
  lifecycle: lifecycleEnum.transient,
});

export default searchStoreInjectable;
