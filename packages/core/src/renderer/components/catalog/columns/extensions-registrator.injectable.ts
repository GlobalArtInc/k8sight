import { getInjectable } from "@ogre-tools/injectable";
import { extensionRegistratorInjectionToken } from "../../../../extensions/extension-loader/extension-registrator-injection-token";
import { customCatalogCategoryColumnInjectionToken } from "./custom-token";

import type { K8sightRendererExtension } from "../../../../extensions/k8sight-renderer-extension";
import type { AdditionalCategoryColumnRegistration } from "../custom-category-columns";

const customCategoryColumnsRegistratorInjectable = getInjectable({
  id: "custom-category-columns-registrator",
  instantiate: () => (ext) => {
    const extension = ext as K8sightRendererExtension;

    return extension.additionalCategoryColumns.map(getInjectableForColumnRegistrationFor(extension));
  },
  injectionToken: extensionRegistratorInjectionToken,
});

export default customCategoryColumnsRegistratorInjectable;

const getInjectableForColumnRegistrationFor =
  (extension: K8sightRendererExtension) =>
  ({
    group,
    id,
    kind,
    renderCell,
    titleProps,
    priority = 50,
    searchFilter,
    sortCallback,
  }: AdditionalCategoryColumnRegistration) => {
    return getInjectable({
      id: `${extension.manifest.name}:${group}/${kind}:${id}`,
      instantiate: () => ({
        group,
        kind,
        registration: {
          renderCell,
          priority,
          id,
          titleProps: {
            id,
            ...titleProps,
            sortBy: sortCallback ? id : undefined,
          },
          searchFilter,
          sortCallback,
        },
      }),
      injectionToken: customCatalogCategoryColumnInjectionToken,
    });
  };
