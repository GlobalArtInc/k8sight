import { Icon } from "@kubesightapp/icon";
import { cssNames } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import filteredCategoriesInjectable from "../../../common/catalog/filtered-categories.injectable";
import { browseCatalogTab } from "./catalog-browse-tab";
import { CatalogCategoryLabel } from "./catalog-category-label";
import styles from "./catalog-category-tabs.module.scss";

import type { IComputedValue } from "mobx";

import type { CatalogCategory } from "../../api/catalog-entity";

export interface CatalogCategoryTabsProps {
  activeTab: string | undefined;
  onItemClick: (id: string) => void;
}

interface Dependencies {
  filteredCategories: IComputedValue<CatalogCategory[]>;
}

const CategoryIcon = ({ category }: { category: CatalogCategory }) => {
  const { icon } = category.metadata ?? {};

  if (typeof icon !== "string") {
    return null;
  }

  return Icon.isSvg(icon) ? <Icon small svg={icon} /> : <Icon small material={icon} />;
};

/**
 * Category switcher for the catalog page.
 *
 * This used to be a sidebar of its own. With the navigator now standing to the left of every page,
 * a second column of navigation read as two competing sidebars, so the categories moved inside the
 * page they belong to.
 */
const NonInjectedCatalogCategoryTabs = observer(
  ({ activeTab, filteredCategories, onItemClick }: CatalogCategoryTabsProps & Dependencies) => (
    <div className={styles.tabs} role="tablist" data-testid="catalog-category-tabs">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === browseCatalogTab}
        className={cssNames(styles.tab, { [styles.active]: activeTab === browseCatalogTab })}
        data-testid="*-tab"
        onClick={() => onItemClick("*")}
      >
        Browse
      </button>

      {filteredCategories.get().map((category) => (
        <button
          type="button"
          role="tab"
          key={category.getId()}
          aria-selected={activeTab === category.getId()}
          className={cssNames(styles.tab, { [styles.active]: activeTab === category.getId() })}
          data-testid={`${category.getId()}-tab`}
          onClick={() => onItemClick(category.getId())}
        >
          <CategoryIcon category={category} />
          <CatalogCategoryLabel category={category} />
        </button>
      ))}
    </div>
  ),
);

export const CatalogCategoryTabs = withInjectables<Dependencies, CatalogCategoryTabsProps>(
  NonInjectedCatalogCategoryTabs,
  {
    getProps: (di, props) => ({
      ...props,
      filteredCategories: di.inject(filteredCategoriesInjectable),
    }),
  },
);

CatalogCategoryTabs.displayName = "CatalogCategoryTabs";
