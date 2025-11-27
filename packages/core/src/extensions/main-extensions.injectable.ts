import { getInjectable } from "@ogre-tools/injectable";
import extensionsInjectable from "./extensions.injectable";

import type { IComputedValue } from "mobx";

import type { LensMainExtension } from "./lens-main-extension";

const mainExtensionsInjectable = getInjectable({
  id: "main-extensions",

  instantiate: (di) => di.inject(extensionsInjectable) as IComputedValue<LensMainExtension[]>,
});

export default mainExtensionsInjectable;
