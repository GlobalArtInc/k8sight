import { getInjectable } from "@ogre-tools/injectable";
import jobStoreInjectable from "./store.injectable";

import type { CronJob, Job } from "@kubesightapp/kube-object";

export type GetJobsByOwner = (cronJob: CronJob) => Job[];

const getJobsByOwnerInjectable = getInjectable({
  id: "get-jobs-by-owner",
  instantiate: (di): GetJobsByOwner => {
    const store = di.inject(jobStoreInjectable);

    return (cronJob) => store.getJobsByOwner(cronJob);
  },
});

export default getJobsByOwnerInjectable;
