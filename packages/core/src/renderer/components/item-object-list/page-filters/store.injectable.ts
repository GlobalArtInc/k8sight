import { getInjectable } from "@ogre-tools/injectable";
import searchUrlPageParamInjectable from "../../input/search-url-page-param.injectable";
import { PageFiltersStore } from "./store";

const pageFiltersStoreInjectable = getInjectable({
  id: "page-filters-store",
  instantiate: (di) =>
    new PageFiltersStore({
      searchUrlParam: di.inject(searchUrlPageParamInjectable),
    }),
});

export default pageFiltersStoreInjectable;
