import { getInjectable } from "@ogre-tools/injectable";
import createPageParamInjectable from "../../navigation/create-page-param.injectable";

const orderByUrlParamInjectable = getInjectable({
  id: "order-by-url-param",
  instantiate: (di) => {
    const createPageParam = di.inject(createPageParamInjectable);

    return createPageParam({
      name: "order",
    });
  },
});

export default orderByUrlParamInjectable;
