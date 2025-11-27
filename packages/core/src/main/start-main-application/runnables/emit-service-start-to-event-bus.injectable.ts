import { afterApplicationIsLoadedInjectionToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import emitAppEventInjectable from "../../../common/app-event-bus/emit-event.injectable";

const emitServiceStartToEventBusInjectable = getInjectable({
  id: "emit-service-start-to-event-bus",

  instantiate: (di) => ({
    run: () => {
      const emitAppEvent = di.inject(emitAppEventInjectable);

      emitAppEvent({ name: "service", action: "start" });
    },
  }),

  injectionToken: afterApplicationIsLoadedInjectionToken,
});

export default emitServiceStartToEventBusInjectable;
