import { secretApiInjectable } from "@kubesightapp/kube-api-specifics";
import { stopPropagation } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import getMaybeDetailsUrlInjectable, {
  type GetMaybeDetailsUrl,
} from "../kube-detail-params/get-maybe-details-url.injectable";
import { MaybeLink } from "../maybe-link";
import { WithTooltip } from "../with-tooltip";

import type { SecretApi } from "@kubesightapp/kube-api";

interface Dependencies {
  getMaybeDetailsUrl: GetMaybeDetailsUrl;
  secretApi: SecretApi;
}

interface LinkToSecretProps {
  name?: string;
  namespace?: string;
}

function NonInjectedLinkToSecret({ name, namespace, getMaybeDetailsUrl, secretApi }: LinkToSecretProps & Dependencies) {
  if (!name || !namespace) return null;

  return (
    <MaybeLink
      key="link"
      to={getMaybeDetailsUrl(
        secretApi.formatUrlForNotListing({
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

export const LinkToSecret = withInjectables<Dependencies, LinkToSecretProps>(NonInjectedLinkToSecret, {
  getProps: (di, props) => ({
    ...props,
    getMaybeDetailsUrl: di.inject(getMaybeDetailsUrlInjectable),
    secretApi: di.inject(secretApiInjectable),
  }),
});
