import "./drawer-item.scss";

import { cssNames } from "@kubesightapp/utilities";
import React from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface DrawerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: StrictReactNode;
  title?: string;
  labelsOnly?: boolean;
  hidden?: boolean;

  /**
   * @deprecated This prop is no longer used, you should stringify the booleans yourself.
   *
   * This was only meant to be an internal prop anyway.
   */
  renderBooleans?: boolean;
}

export function DrawerItem({
  name,
  title,
  labelsOnly,
  children,
  hidden = false,
  className,
  ...elemProps
}: DrawerItemProps) {
  if (hidden) {
    return null;
  }

  return (
    <div
      {...elemProps}
      className={cssNames("DrawerItem", className, name ? "" : "WithoutName", { labelsOnly })}
      title={title}
    >
      {name && <span className="name">{name}</span>}
      <span className="value">{children}</span>
    </div>
  );
}
