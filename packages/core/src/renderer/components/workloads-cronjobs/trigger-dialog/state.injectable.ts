import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { CronJob } from "@kubesightapp/kube-object";

const cronJobTriggerDialogStateInjectable = getInjectable({
  id: "cron-job-trigger-dialog-state",
  instantiate: () => observable.box<CronJob>(),
});

export default cronJobTriggerDialogStateInjectable;
