import { getInjectable } from "@ogre-tools/injectable";
import appEventBusInjectable from "./app-event-bus.injectable";

import type { AppEvent } from "./event-bus";

export type EmitAppEvent = (event: AppEvent) => void;

const emitAppEventInjectable = getInjectable({
  id: "emit-app-event",
  instantiate: (di): EmitAppEvent => {
    const bus = di.inject(appEventBusInjectable);

    return (event) => bus.emit(event);
  },
  decorable: false,
});

export default emitAppEventInjectable;
