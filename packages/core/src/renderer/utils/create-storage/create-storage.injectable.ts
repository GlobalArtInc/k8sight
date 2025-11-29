import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import createStorageHelperInjectable from "../create-storage-helper.injectable";
import k8sightLocalStorageStateInjectable from "./state.injectable";

import type { StorageLayer } from "../storage-helper";

export type CreateStorage = <T>(key: string, defaultValue: T) => StorageLayer<T>;

const createStorageInjectable = getInjectable({
  id: "create-storage",

  instantiate: (di): CreateStorage => {
    const k8sightLocalStorageState = di.inject(k8sightLocalStorageStateInjectable);
    const createStorageHelper = di.inject(createStorageHelperInjectable);

    return <T>(key: string, defaultValue: T) =>
      createStorageHelper<T>(key, {
        defaultValue,
        storage: {
          getItem: (key) => k8sightLocalStorageState[key] as T,
          setItem: action((key, value) => (k8sightLocalStorageState[key] = value)),
          removeItem: action((key) => delete k8sightLocalStorageState[key]),
        },
      });
  },
});

export default createStorageInjectable;
