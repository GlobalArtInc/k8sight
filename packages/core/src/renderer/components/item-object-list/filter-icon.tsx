import { Icon } from "@kubesightapp/icon";
import React from "react";
import { FilterType } from "./page-filters/store";

import type { IconProps } from "@kubesightapp/icon";

export interface FilterIconProps extends Partial<IconProps> {
  type: FilterType;
}

export function FilterIcon(props: FilterIconProps) {
  const { type, ...iconProps } = props;

  switch (type) {
    case FilterType.SEARCH:
      return <Icon small material="search" {...iconProps} />;

    default:
      return <Icon small material="filter_list" {...iconProps} />;
  }
}
