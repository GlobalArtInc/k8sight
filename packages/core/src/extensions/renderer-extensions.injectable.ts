import { getInjectable } from "@ogre-tools/injectable";
import extensionsInjectable from "./extensions.injectable";

import type { IComputedValue } from "mobx";

import type { LensRendererExtension } from "./lens-renderer-extension";

const rendererExtensionsInjectable = getInjectable({
  id: "renderer-extensions",
  instantiate: (di) => di.inject(extensionsInjectable) as IComputedValue<LensRendererExtension[]>,
});

export default rendererExtensionsInjectable;
