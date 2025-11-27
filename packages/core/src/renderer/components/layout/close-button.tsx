import { Icon } from "@kubesightapp/icon";
import React from "react";
import styles from "./close-button.module.scss";

import type { HTMLAttributes } from "react";

export interface CloseButtonProps extends HTMLAttributes<HTMLDivElement> {}

export function CloseButton(props: CloseButtonProps) {
  return (
    <div {...props}>
      <div className={styles.closeButton} role="button" aria-label="Close">
        <Icon material="close" className={styles.icon} />
      </div>
      <div className={styles.esc} aria-hidden="true">
        ESC
      </div>
    </div>
  );
}
