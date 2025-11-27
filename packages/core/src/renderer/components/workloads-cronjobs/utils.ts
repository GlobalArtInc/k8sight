import cronstrue from "cronstrue";

import type { CronJob } from "@kubesightapp/kube-object";

export function humanizeSchedule(schedule: string): string {
  try {
    return cronstrue.toString(schedule, { verbose: true });
  } catch {
    return "Unrecognized cron expression syntax";
  }
}

export function getScheduleFullDescription(cronJob: CronJob): string {
  const schedule = cronJob.getSchedule().replace(/\s+/g, " ");
  const humanized = humanizeSchedule(schedule);
  return `${schedule} (${humanized}${cronJob.isNeverRun() ? ", never ran" : ""})`;
}
