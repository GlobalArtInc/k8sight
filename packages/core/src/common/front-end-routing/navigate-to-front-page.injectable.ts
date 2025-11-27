import { getInjectable } from "@ogre-tools/injectable";
import navigateToCatalogInjectable from "./routes/catalog/navigate-to-catalog.injectable";

const navigateToFrontPageInjectable = getInjectable({
  id: "navigate-to-front-page",
  instantiate: (di) => di.inject(navigateToCatalogInjectable),
});

export default navigateToFrontPageInjectable;
