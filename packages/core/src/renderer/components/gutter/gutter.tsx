import { cssNames } from "@kubesightapp/utilities";
import React from "react";
import styles from "./gutter.module.scss";

interface GutterProps {
  size?: "sm" | "md" | "xl";
}

export const Gutter = ({ size = "md" }: GutterProps) => {
  const classNames = cssNames(styles[`size-${size}`]);

  return <div className={classNames} />;
};
