import { getInjectable } from "@ogre-tools/injectable";
import defaultCategoryColumnsInjectable from "./default-category.injectable";
import namedCategoryColumnInjectable from "./named-category.injectable";

import type { RegisteredAdditionalCategoryColumn } from "../custom-category-columns";

const defaultBrowseAllColumns: RegisteredAdditionalCategoryColumn[] = [
  {
    id: "kind",
    priority: 5,
    renderCell: (entity) => entity.kind,
    titleProps: {
      id: "kind",
      sortBy: "kind",
      title: "Kind",
      "data-testid": "catalog-kind-column",
    },
    sortCallback: (entity) => entity.kind,
  },
];

const browseAllColumnsInjectable = getInjectable({
  id: "browse-all-columns",
  instantiate: (di) => [
    ...defaultBrowseAllColumns,
    di.inject(namedCategoryColumnInjectable),
    ...di.inject(defaultCategoryColumnsInjectable),
  ],
});

export default browseAllColumnsInjectable;
