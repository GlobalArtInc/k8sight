import { getInjectable } from "@ogre-tools/injectable";
import computeDisplayIndexInjectable from "./compute-display-index.injectable";

import type { Hotbar } from "./hotbar";

export type ComputeHotbarDisplayLabel = (hotbar: Hotbar) => string;

const computeHotbarDisplayLabelInjectable = getInjectable({
  id: "compute-hotbar-display-label",
  instantiate: (di): ComputeHotbarDisplayLabel => {
    const computeDisplayIndex = di.inject(computeDisplayIndexInjectable);

    return (hotbar) => `${computeDisplayIndex(hotbar.id)}: ${hotbar.name}`;
  },
});

export default computeHotbarDisplayLabelInjectable;
