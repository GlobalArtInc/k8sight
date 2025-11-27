import { loggerInjectionToken } from "@kubesightapp/logger";
import { showErrorNotificationInjectable } from "@kubesightapp/notifications";
import { getInjectable } from "@ogre-tools/injectable";
import openSaveFileDialogInjectable from "../../../utils/save-file.injectable";
import callForLogsInjectable from "./call-for-logs.injectable";

import type { ResourceDescriptor } from "@kubesightapp/kube-api";
import type { PodLogsQuery } from "@kubesightapp/kube-object";

const downloadAllLogsInjectable = getInjectable({
  id: "download-all-logs",

  instantiate: (di) => {
    const callForLogs = di.inject(callForLogsInjectable);
    const openSaveFileDialog = di.inject(openSaveFileDialogInjectable);
    const logger = di.inject(loggerInjectionToken);
    const showErrorNotification = di.inject(showErrorNotificationInjectable);

    return async (params: ResourceDescriptor, query: PodLogsQuery) => {
      const logs = await callForLogs(params, query).catch((error) => {
        logger.error("Can't download logs: ", error);
      });

      if (logs) {
        openSaveFileDialog(`${query.container}.log`, logs, "text/plain");
      } else {
        showErrorNotification("No logs to download");
      }
    };
  },
});

export default downloadAllLogsInjectable;
