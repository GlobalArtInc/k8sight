import { clusterRoleApiInjectable } from "@kubesightapp/kube-api-specifics";
import { stopPropagation } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import getMaybeDetailsUrlInjectable, {
  type GetMaybeDetailsUrl,
} from "../kube-detail-params/get-maybe-details-url.injectable";
import { MaybeLink } from "../maybe-link";
import { WithTooltip } from "../with-tooltip";

import type { ClusterRoleApi } from "@kubesightapp/kube-api";

interface Dependencies {
  getMaybeDetailsUrl: GetMaybeDetailsUrl;
  clusterRoleApi: ClusterRoleApi;
}

interface LinkToClusterRoleProps {
  name?: string;
}

function NonInjectedLinkToClusterRole({
  name,
  getMaybeDetailsUrl,
  clusterRoleApi,
}: LinkToClusterRoleProps & Dependencies) {
  if (!name) return null;

  return (
    <MaybeLink
      key="link"
      to={getMaybeDetailsUrl(
        clusterRoleApi.formatUrlForNotListing({
          name,
        }),
      )}
      onClick={stopPropagation}
    >
      <WithTooltip>{name}</WithTooltip>
    </MaybeLink>
  );
}

export const LinkToClusterRole = withInjectables<Dependencies, LinkToClusterRoleProps>(NonInjectedLinkToClusterRole, {
  getProps: (di, props) => ({
    ...props,
    getMaybeDetailsUrl: di.inject(getMaybeDetailsUrlInjectable),
    clusterRoleApi: di.inject(clusterRoleApiInjectable),
  }),
});
