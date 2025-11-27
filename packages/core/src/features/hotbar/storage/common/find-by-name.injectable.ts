import { iter } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import hotbarsStateInjectable from "./state.injectable";

import type { Hotbar } from "./hotbar";

export type FindHotbarByName = (name: string) => Hotbar | undefined;

const findHotbarByNameInjectable = getInjectable({
  id: "find-hotbar-by-name",
  instantiate: (di): FindHotbarByName => {
    const state = di.inject(hotbarsStateInjectable);

    return (name) => iter.find(state.values(), (hotbar) => hotbar.name.get() === name);
  },
});

export default findHotbarByNameInjectable;
