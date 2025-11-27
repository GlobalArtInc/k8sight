import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import cronJobTriggerDialogStateInjectable from "./state.injectable";

import type { CronJob } from "@kubesightapp/kube-object";

export type OpenCronJobTriggerDialog = (cronJob: CronJob) => void;

const openCronJobTriggerDialogInjectable = getInjectable({
  id: "open-cron-job-trigger-dialog",
  instantiate: (di): OpenCronJobTriggerDialog => {
    const state = di.inject(cronJobTriggerDialogStateInjectable);

    return action((cronJob) => state.set(cronJob));
  },
});

export default openCronJobTriggerDialogInjectable;
