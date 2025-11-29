import { getInjectable } from "@ogre-tools/injectable";
import * as uuid from "uuid";
import { extensionRegistratorInjectionToken } from "../../../../extensions/extension-loader/extension-registrator-injection-token";
import { catalogEntityDetailItemInjectionToken } from "./token";

import type { K8sightRendererExtension } from "../../../../extensions/k8sight-renderer-extension";
import type { CatalogEntity } from "../../../api/catalog-entity";
import type { CatalogEntityDetailRegistration } from "./token";

const catalogEntityDetailItemsRegistratorInjectable = getInjectable({
  id: "catalog-entity-detail-items-registrator",
  instantiate: () => (ext) => {
    const extension = ext as K8sightRendererExtension;

    return extension.catalogEntityDetailItems.map(getRegistratorFor(extension));
  },
  injectionToken: extensionRegistratorInjectionToken,
});

export default catalogEntityDetailItemsRegistratorInjectable;

const getRegistratorFor =
  (extension: K8sightRendererExtension) =>
  ({ apiVersions, components, kind, priority }: CatalogEntityDetailRegistration<CatalogEntity>) =>
    getInjectable({
      id: `catalog-entity-detail-item-for-${extension.sanitizedExtensionId}-${uuid.v4()}`,
      instantiate: () => ({
        apiVersions: new Set(apiVersions),
        components,
        kind,
        orderNumber: priority ?? 50,
      }),
      injectionToken: catalogEntityDetailItemInjectionToken,
    });
