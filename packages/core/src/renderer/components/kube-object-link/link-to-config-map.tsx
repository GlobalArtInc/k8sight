import { configMapApiInjectable } from "@kubesightapp/kube-api-specifics";
import { stopPropagation } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import getMaybeDetailsUrlInjectable, {
  type GetMaybeDetailsUrl,
} from "../kube-detail-params/get-maybe-details-url.injectable";
import { MaybeLink } from "../maybe-link";
import { WithTooltip } from "../with-tooltip";

import type { ConfigMapApi } from "@kubesightapp/kube-api";

interface Dependencies {
  getMaybeDetailsUrl: GetMaybeDetailsUrl;
  configMapApi: ConfigMapApi;
}

interface LinkToConfigMapProps {
  name?: string;
  namespace?: string;
}

function NonInjectedLinkToConfigMap({
  name,
  namespace,
  getMaybeDetailsUrl,
  configMapApi,
}: LinkToConfigMapProps & Dependencies) {
  if (!name || !namespace) return null;

  return (
    <MaybeLink
      key="link"
      to={getMaybeDetailsUrl(
        configMapApi.formatUrlForNotListing({
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

export const LinkToConfigMap = withInjectables<Dependencies, LinkToConfigMapProps>(NonInjectedLinkToConfigMap, {
  getProps: (di, props) => ({
    ...props,
    getMaybeDetailsUrl: di.inject(getMaybeDetailsUrlInjectable),
    configMapApi: di.inject(configMapApiInjectable),
  }),
});
