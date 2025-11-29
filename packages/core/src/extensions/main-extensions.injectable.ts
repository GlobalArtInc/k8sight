import { getInjectable } from "@ogre-tools/injectable";
import extensionsInjectable from "./extensions.injectable";

import type { IComputedValue } from "mobx";

import type { K8sightMainExtension } from "./k8sight-main-extension";

const mainExtensionsInjectable = getInjectable({
  id: "main-extensions",

  instantiate: (di) => di.inject(extensionsInjectable) as IComputedValue<K8sightMainExtension[]>,
});

export default mainExtensionsInjectable;
