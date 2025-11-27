import { runtimeClassApiInjectable } from "@kubesightapp/kube-api-specifics";
import { stopPropagation } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import getMaybeDetailsUrlInjectable, {
  type GetMaybeDetailsUrl,
} from "../kube-detail-params/get-maybe-details-url.injectable";
import { MaybeLink } from "../maybe-link";
import { WithTooltip } from "../with-tooltip";

import type { RuntimeClassApi } from "@kubesightapp/kube-api";

interface Dependencies {
  getMaybeDetailsUrl: GetMaybeDetailsUrl;
  runtimeClassApi: RuntimeClassApi;
}

interface LinkToRuntimeClassProps {
  name?: string;
}

function NonInjectedLinkToRuntimeClass({
  name,
  getMaybeDetailsUrl,
  runtimeClassApi,
}: LinkToRuntimeClassProps & Dependencies) {
  if (!name) return null;

  return (
    <MaybeLink
      key="link"
      to={getMaybeDetailsUrl(
        runtimeClassApi.formatUrlForNotListing({
          name,
        }),
      )}
      onClick={stopPropagation}
    >
      <WithTooltip>{name}</WithTooltip>
    </MaybeLink>
  );
}

export const LinkToRuntimeClass = withInjectables<Dependencies, LinkToRuntimeClassProps>(
  NonInjectedLinkToRuntimeClass,
  {
    getProps: (di, props) => ({
      ...props,
      getMaybeDetailsUrl: di.inject(getMaybeDetailsUrlInjectable),
      runtimeClassApi: di.inject(runtimeClassApiInjectable),
    }),
  },
);
