import { getInjectable } from "@ogre-tools/injectable";
import showDetailsInjectable from "./show-details.injectable";

export type HideDetails = () => void;

const hideDetailsInjectable = getInjectable({
  id: "hide-details",
  instantiate: (di): HideDetails => {
    const showDetails = di.inject(showDetailsInjectable);

    return () => showDetails("");
  },
});

export default hideDetailsInjectable;
