import { getInjectable } from "@ogre-tools/injectable";
import hotbarsStateInjectable from "./state.injectable";

export type ComputeHotbarIndex = (hotbarId: string) => number;

const computeHotbarIndexInjectable = getInjectable({
  id: "compute-hotbar-index",
  instantiate: (di): ComputeHotbarIndex => {
    const state = di.inject(hotbarsStateInjectable);

    return (hotbarId) => {
      let i = 0;

      for (const hotbar of state.values()) {
        if (hotbar.id === hotbarId) {
          return i;
        }

        i += 1;
      }

      return 0;
    };
  },
});

export default computeHotbarIndexInjectable;
