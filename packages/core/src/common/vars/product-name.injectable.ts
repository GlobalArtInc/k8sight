import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const productNameInjectable = getInjectable({
  id: "product-name",
  instantiate: (di) => di.inject(applicationInformationToken).productName,
});

export default productNameInjectable;
