import "./hotbar-menu.scss";

import { cssNames } from "@kubesightapp/utilities";
import React, { useState } from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface HotbarCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: StrictReactNode;
  index: number;
  innerRef?: React.Ref<HTMLDivElement>;
}

export function HotbarCell({ innerRef, children, className, ...rest }: HotbarCellProps) {
  const [animating, setAnimating] = useState(false);
  const onAnimationEnd = () => {
    setAnimating(false);
  };
  const onClick = () => {
    setAnimating(!className?.includes("isDraggingOver"));
  };

  return (
    <div
      className={cssNames("HotbarCell", { animating }, className)}
      onAnimationEnd={onAnimationEnd}
      onClick={onClick}
      ref={innerRef}
      {...rest}
    >
      {children}
    </div>
  );
}
