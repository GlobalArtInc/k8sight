import { getInjectionToken } from "@ogre-tools/injectable";

import type TransportStream from "winston-transport";

export const loggerTransportInjectionToken = getInjectionToken<TransportStream>({
  id: "logger-transport",
});
