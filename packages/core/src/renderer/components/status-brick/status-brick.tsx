import "./status-brick.scss";

import { withTooltip } from "@kubesightapp/tooltip";
import { cssNames } from "@kubesightapp/utilities";
import React from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface StatusBrickProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: StrictReactNode;
}

export const StatusBrick = withTooltip(({ className, ...elemProps }: StatusBrickProps) => (
  <div className={cssNames("StatusBrick", className)} {...elemProps} />
));
