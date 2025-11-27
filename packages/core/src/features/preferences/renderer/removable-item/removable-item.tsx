import { Icon } from "@kubesightapp/icon";
import { cssNames } from "@kubesightapp/utilities";
import React from "react";
import styles from "./removable-item.module.scss";

import type { DOMAttributes } from "react";

export interface RemovableItemProps extends DOMAttributes<any> {
  icon?: string;
  onRemove: () => void;
  className?: string;
  "data-testid"?: string;
}

export function RemovableItem({
  icon,
  onRemove,
  children,
  className,
  "data-testid": testId,
  ...rest
}: RemovableItemProps) {
  return (
    <div className={cssNames(styles.item, "flex gaps align-center justify-space-between", className)} {...rest}>
      {icon && <Icon material={icon} />}
      {children}
      <Icon material="delete" onClick={onRemove} tooltip="Remove" data-testid={testId} />
    </div>
  );
}
