import { getOrInsert, getOrInsertMap } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { computedInjectManyInjectable } from "@ogre-tools/injectable-extension-for-mobx";
import { computed } from "mobx";
import { customCatalogCategoryColumnInjectionToken } from "./columns/custom-token";

import type { RegisteredAdditionalCategoryColumn } from "./custom-category-columns";

const categoryColumnsInjectable = getInjectable({
  id: "category-columns",
  instantiate: (di) => {
    const computedInjectMany = di.inject(computedInjectManyInjectable);
    const columnRegistrations = computedInjectMany(customCatalogCategoryColumnInjectionToken);

    return computed(() => {
      const res = new Map<string, Map<string, RegisteredAdditionalCategoryColumn[]>>();

      for (const { group, kind, registration } of columnRegistrations.get()) {
        const byGroup = getOrInsertMap(res, group);
        const byKind = getOrInsert(byGroup, kind, []);

        byKind.push(registration);
      }

      return res;
    });
  },
});

export default categoryColumnsInjectable;
