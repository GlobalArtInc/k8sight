import "./no-items.scss";

import { cssNames } from "@kubesightapp/utilities";
import React from "react";

import type { IClassName, StrictReactNode } from "@kubesightapp/utilities";

export interface NoItemsProps {
  className?: IClassName;
  children?: StrictReactNode;
}

export function NoItems(props: NoItemsProps) {
  const { className, children } = props;

  return (
    <div className={cssNames("NoItems flex box grow", className)}>
      <div className="box center">{children || "Item list is empty"}</div>
    </div>
  );
}
