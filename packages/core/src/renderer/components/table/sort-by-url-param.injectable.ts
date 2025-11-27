import { getInjectable } from "@ogre-tools/injectable";
import createPageParamInjectable from "../../navigation/create-page-param.injectable";

const sortByUrlParamInjectable = getInjectable({
  id: "sort-by-url-param",
  instantiate: (di) => {
    const createPageParam = di.inject(createPageParamInjectable);

    return createPageParam({
      name: "sort",
    });
  },
});

export default sortByUrlParamInjectable;
