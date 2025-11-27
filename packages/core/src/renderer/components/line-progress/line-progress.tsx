import "./line-progress.scss";

import { withTooltip } from "@kubesightapp/tooltip";
import { cssNames } from "@kubesightapp/utilities";
import React from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface LineProgressProps extends React.HTMLProps<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  className?: any;
  precise?: number;
  children?: StrictReactNode;
}

function valuePercent({
  value,
  min,
  max,
  precise,
}: Required<Pick<LineProgressProps, "value" | "min" | "max" | "precise">>) {
  return Math.min(100, (value / (max - min)) * 100).toFixed(precise);
}

export const LineProgress = withTooltip(
  ({ className, min = 0, max = 100, value, precise = 2, children, ...props }: LineProgressProps) => (
    <div className={cssNames("LineProgress", className)} {...props}>
      <div
        className="line"
        style={{
          width: `${valuePercent({ min, max, value, precise })}%`,
        }}
      />
      {children}
    </div>
  ),
);
