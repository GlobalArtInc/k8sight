import { jobApiInjectable } from "@kubesightapp/kube-api-specifics";
import { stopPropagation } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import getMaybeDetailsUrlInjectable, {
  type GetMaybeDetailsUrl,
} from "../kube-detail-params/get-maybe-details-url.injectable";
import { MaybeLink } from "../maybe-link";
import { WithTooltip } from "../with-tooltip";

import type { JobApi } from "@kubesightapp/kube-api";

interface Dependencies {
  getMaybeDetailsUrl: GetMaybeDetailsUrl;
  jobApi: JobApi;
}

interface LinkToJobProps {
  name?: string;
  namespace?: string;
}

function NonInjectedLinkToJob({ name, namespace, getMaybeDetailsUrl, jobApi }: LinkToJobProps & Dependencies) {
  if (!name || !namespace) return null;

  return (
    <MaybeLink
      key="link"
      to={getMaybeDetailsUrl(
        jobApi.formatUrlForNotListing({
          name,
          namespace,
        }),
      )}
      onClick={stopPropagation}
    >
      <WithTooltip>{name}</WithTooltip>
    </MaybeLink>
  );
}

export const LinkToJob = withInjectables<Dependencies, LinkToJobProps>(NonInjectedLinkToJob, {
  getProps: (di, props) => ({
    ...props,
    getMaybeDetailsUrl: di.inject(getMaybeDetailsUrlInjectable),
    jobApi: di.inject(jobApiInjectable),
  }),
});
