import { getInjectable } from "@ogre-tools/injectable";
import { transports } from "winston";
import directoryForLogsInjectable from "../../../common/app-paths/directory-for-logs.injectable";

const createIpcFileLoggerTransportInjectable = getInjectable({
  id: "create-ipc-file-logger-transport",
  instantiate: (di) => {
    const options = {
      dirname: di.inject(directoryForLogsInjectable),
      maxsize: 1024 * 1024,
      maxFiles: 2,
      tailable: true,
    };

    return (fileId: string) =>
      new transports.File({
        ...options,
        filename: `k8sight-${fileId}.log`,
      });
  },
  causesSideEffects: true,
});

export default createIpcFileLoggerTransportInjectable;
