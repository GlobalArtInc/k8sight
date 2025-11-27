import "./drawer-title.scss";

import { cssNames } from "@kubesightapp/utilities";
import React from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface DrawerTitleProps {
  className?: string;
  children?: StrictReactNode;

  /**
   * @deprecated Prefer passing the value as `children`
   */
  title?: StrictReactNode;

  /**
   * Specifies how large this title is
   *
   * @default "title"
   */
  size?: "sub-title" | "title";
}

export function DrawerTitle({ className, children, size = "title" }: DrawerTitleProps) {
  return (
    <div
      className={cssNames("DrawerTitle", className, {
        title: size === "title",
        "sub-title": size === "sub-title",
      })}
    >
      {children}
    </div>
  );
}
