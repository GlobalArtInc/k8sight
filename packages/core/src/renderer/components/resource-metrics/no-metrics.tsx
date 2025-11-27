import { Icon } from "@kubesightapp/icon";
import React from "react";

export function NoMetrics() {
  return (
    <div className="flex justify-center align-center">
      <Icon material="info" />
      &nbsp;Metrics not available at the moment
    </div>
  );
}
