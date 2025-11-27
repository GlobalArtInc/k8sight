import "./pod-details-statuses.scss";

import countBy from "lodash/countBy";
import kebabCase from "lodash/kebabCase";
import React from "react";

import type { Pod } from "@kubesightapp/kube-object";

export interface PodDetailsStatusesProps {
  pods: Pod[];
}

export class PodDetailsStatuses extends React.Component<PodDetailsStatusesProps> {
  render() {
    const { pods } = this.props;

    if (!pods.length) return null;
    const statuses = countBy(pods.map((pod) => pod.getStatus()));

    return (
      <div className="PodDetailsStatuses">
        {Object.entries(statuses).map(([phase, count]) => (
          <span key={phase} className={kebabCase(phase)}>
            {`${phase}: ${count}`}
          </span>
        ))}
      </div>
    );
  }
}
