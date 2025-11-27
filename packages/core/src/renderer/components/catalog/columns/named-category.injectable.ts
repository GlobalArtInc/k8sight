import { getInjectable } from "@ogre-tools/injectable";
import styles from "../catalog.module.scss";
import renderNamedCategoryColumnCellInjectable from "./render-named-category-column-cell.injectable";

import type { RegisteredAdditionalCategoryColumn } from "../custom-category-columns";

const namedCategoryColumnInjectable = getInjectable({
  id: "name-category-column",
  instantiate: (di): RegisteredAdditionalCategoryColumn => ({
    id: "name",
    priority: 0,
    renderCell: di.inject(renderNamedCategoryColumnCellInjectable),
    titleProps: {
      title: "Name",
      className: styles.entityName,
      id: "name",
      sortBy: "name",
    },
    searchFilter: (entity) => entity.getName(),
    sortCallback: (entity) => `name=${entity.getName()}`,
  }),
});

export default namedCategoryColumnInjectable;
