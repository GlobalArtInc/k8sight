import { EventEmitter } from "@kubesightapp/event-emitter";
import { getInjectable } from "@ogre-tools/injectable";

import type { AppEvent } from "./event-bus";

const appEventBusInjectable = getInjectable({
  id: "app-event-bus",
  instantiate: () => new EventEmitter<[AppEvent]>(),
  decorable: false,
});

export default appEventBusInjectable;
