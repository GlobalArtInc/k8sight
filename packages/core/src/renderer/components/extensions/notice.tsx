import { cssNames } from "@kubesightapp/utilities";
import React from "react";
import styles from "./notice.module.scss";

import type { DOMAttributes } from "react";

export interface NoticeProps extends DOMAttributes<any> {
  className?: string;
}

export function Notice(props: NoticeProps) {
  return <div className={cssNames(styles.notice, props.className)}>{props.children}</div>;
}
