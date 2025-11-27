import React from "react";

import type { CatalogCategory } from "../../../common/catalog/catalog-entity";

interface CatalogCategoryLabelProps {
  category: CatalogCategory;
}

/**
 * Display label for Catalog Category for the Catalog menu
 */
export const CatalogCategoryLabel = ({ category }: CatalogCategoryLabelProps) => {
  const badge = category.getBadge();

  return (
    <div className="flex">
      <div>{category.metadata.name}</div>
      {badge ? <div className="flex items-center">{badge}</div> : null}
    </div>
  );
};
