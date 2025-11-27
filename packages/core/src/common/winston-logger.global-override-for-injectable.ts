import { winstonLoggerInjectable } from "@kubesightapp/logger";
import { getGlobalOverride } from "@kubesightapp/test-utils";
import { noop } from "@kubesightapp/utilities";

import type winston from "winston";

export default getGlobalOverride(
  winstonLoggerInjectable,
  () =>
    ({
      log: noop,
      add: noop,
      remove: noop,
      clear: noop,
      close: noop,

      warn: noop,
      debug: noop,
      error: noop,
      info: noop,
      silly: noop,
    }) as winston.Logger,
);
