import { getInjectable } from "@ogre-tools/injectable";
import extensionsInjectable from "./extensions.injectable";

import type { IComputedValue } from "mobx";

import type { K8sightRendererExtension } from "./k8sight-renderer-extension";

const rendererExtensionsInjectable = getInjectable({
  id: "renderer-extensions",
  instantiate: (di) => di.inject(extensionsInjectable) as IComputedValue<K8sightRendererExtension[]>,
});

export default rendererExtensionsInjectable;
