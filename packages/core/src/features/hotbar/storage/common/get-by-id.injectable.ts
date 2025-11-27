import { getInjectable } from "@ogre-tools/injectable";
import hotbarsStateInjectable from "./state.injectable";

import type { Hotbar } from "./hotbar";

export type GetHotbarById = (id: string) => Hotbar | undefined;

const getHotbarByIdInjectable = getInjectable({
  id: "get-hotbar-by-id",
  instantiate: (di): GetHotbarById => {
    const state = di.inject(hotbarsStateInjectable);

    return (id) => state.get(id);
  },
});

export default getHotbarByIdInjectable;
