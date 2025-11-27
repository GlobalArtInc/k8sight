import { getGlobalOverride } from "@kubesightapp/test-utils";
import { noop } from "@kubesightapp/utilities";
import createIpcFileLoggerTransportInjectable from "./create-ipc-file-transport.injectable";

import type { transports } from "winston";

export default getGlobalOverride(
  createIpcFileLoggerTransportInjectable,
  () => () =>
    ({
      log: noop,
      close: noop,
    }) as typeof transports.File,
);
