import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import enabledExtensionsStateInjectable from "./state.injectable";

import type { K8sightExtensionId } from "@kubesightapp/legacy-extensions";

import type { IObservableMapInitialValues } from "mobx";

import type { K8sightExtensionState } from "./state.injectable";

export type UpdateExtensionsState = (state: IObservableMapInitialValues<K8sightExtensionId, K8sightExtensionState>) => void;

const updateExtensionsStateInjectable = getInjectable({
  id: "update-extensions-state",
  instantiate: (di): UpdateExtensionsState => {
    const state = di.inject(enabledExtensionsStateInjectable);

    return action((newState) => state.merge(newState));
  },
});

export default updateExtensionsStateInjectable;
