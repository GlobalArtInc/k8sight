import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { CronJobTriggerDialog } from "./trigger-dialog/view";

const cronJobTriggerDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "cron-job-trigger-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "cron-job-trigger-dialog",
    shouldRender: computed(() => true),
    Component: CronJobTriggerDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default cronJobTriggerDialogClusterFrameChildComponentInjectable;
