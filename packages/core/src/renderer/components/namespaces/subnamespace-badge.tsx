import { Tooltip } from "@kubesightapp/tooltip";
import { cssNames } from "@kubesightapp/utilities";
import React from "react";
import styles from "./subnamespace-badge.module.scss";

interface SubnamespaceBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  id: string;
}

export function SubnamespaceBadge({ id, className, ...other }: SubnamespaceBadgeProps) {
  return (
    <>
      <span className={cssNames(styles.subnamespaceBadge, className)} data-testid={id} id={id} {...other}>
        S
      </span>
      <Tooltip targetId={id}>Subnamespace</Tooltip>
    </>
  );
}
