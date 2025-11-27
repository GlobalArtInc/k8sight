import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { PreferenceDescriptors } from "./preference-descriptors.injectable";
import type { StoreType } from "./preferences-helpers";

export type UserPreferencesState = {
  -readonly [Field in keyof PreferenceDescriptors]: StoreType<PreferenceDescriptors[Field]>;
};

const userPreferencesStateInjectable = getInjectable({
  id: "user-preferences-state",
  instantiate: () => observable.object({} as UserPreferencesState),
});

export default userPreferencesStateInjectable;
