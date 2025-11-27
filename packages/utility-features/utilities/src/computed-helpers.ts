import { computed } from "mobx";

import type { IComputedValue } from "mobx";

export const computedOr = (...values: IComputedValue<boolean>[]) => computed(() => values.some((value) => value.get()));

export const computedAnd = (...values: IComputedValue<boolean>[]) =>
  computed(() => values.every((value) => value.get()));
