import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import { createPath } from "history";
import { action } from "mobx";

import type { LocationDescriptor } from "history";

export type Navigate = (location: LocationDescriptor) => void;

const navigateInjectable = getInjectable({
  id: "navigate",
  instantiate: (di): Navigate => {
    const observableHistory = di.inject(observableHistoryInjectionToken);

    return action((location) => {
      const currentLocation = createPath(observableHistory.location);

      observableHistory.push(location);

      const newLocation = createPath(observableHistory.location);

      if (currentLocation === newLocation) {
        observableHistory.goBack(); // prevent sequences of same url in history
      }
    });
  },
});

export default navigateInjectable;
