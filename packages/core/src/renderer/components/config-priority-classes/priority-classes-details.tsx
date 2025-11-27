import "./priority-classes.scss";

import { observer } from "mobx-react";
import React from "react";
import { DrawerItem } from "../drawer";

import type { PriorityClass } from "@kubesightapp/kube-object";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface PriorityClassesDetailsProps extends KubeObjectDetailsProps<PriorityClass> {}

@observer
export class PriorityClassesDetails extends React.Component<PriorityClassesDetailsProps> {
  render() {
    const { object: pc } = this.props;

    return (
      <div className="PriorityClassesDetails">
        <DrawerItem name="Description">{pc.getDescription()}</DrawerItem>

        <DrawerItem name="Value">{pc.getValue()}</DrawerItem>

        <DrawerItem name="Global Default">{pc.getGlobalDefault()}</DrawerItem>
      </div>
    );
  }
}
