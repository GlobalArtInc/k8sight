import { cssNames } from "@kubesightapp/utilities";
import React from "react";
import styles from "./horizontal-line.module.scss";

interface HorizontalLineProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
}

export const HorizontalLine = ({ size = "xl" }: HorizontalLineProps = { size: "xl" }) => {
  const classNames = cssNames(styles.HorizontalLine, styles[`size-${size}`]);

  return <div className={classNames} />;
};
