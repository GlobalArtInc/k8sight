import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const k8sightLocalStorageStateInjectable = getInjectable({
  id: "k8sight-local-storage-state",
  instantiate: () => observable.object({} as Record<string, unknown>),
});

export default k8sightLocalStorageStateInjectable;
