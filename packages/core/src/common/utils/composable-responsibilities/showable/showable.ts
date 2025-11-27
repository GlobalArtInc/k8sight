import { isBoolean } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";

export interface Showable {
  readonly isShown: IComputedValue<boolean> | boolean;
}

export type MaybeShowable = Showable | object;

export const isShown = (showable: MaybeShowable) => {
  if (!("isShown" in showable)) {
    return true;
  }

  if (showable.isShown === undefined) {
    return true;
  }

  if (isBoolean(showable.isShown)) {
    return showable.isShown;
  }

  return showable.isShown.get();
};
