import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import enabledExtensionsStateInjectable from "./state.injectable";

import type { LensExtensionId } from "@kubesightapp/legacy-extensions";

import type { IObservableMapInitialValues } from "mobx";

import type { LensExtensionState } from "./state.injectable";

export type UpdateExtensionsState = (state: IObservableMapInitialValues<LensExtensionId, LensExtensionState>) => void;

const updateExtensionsStateInjectable = getInjectable({
  id: "update-extensions-state",
  instantiate: (di): UpdateExtensionsState => {
    const state = di.inject(enabledExtensionsStateInjectable);

    return action((newState) => state.merge(newState));
  },
});

export default updateExtensionsStateInjectable;
