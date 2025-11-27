import "./drawer-param-toggler.scss";

import { Icon } from "@kubesightapp/icon";
import { cssNames } from "@kubesightapp/utilities";
import React from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface DrawerParamTogglerProps {
  label: string | number | StrictReactNode;
  children: StrictReactNode;
}

interface State {
  open?: boolean;
}
export class DrawerParamToggler extends React.Component<DrawerParamTogglerProps, State> {
  public state: State = {};

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { label, children } = this.props;
    const { open } = this.state;
    const icon = `arrow_drop_${open ? "up" : "down"}`;
    const link = open ? `Hide` : `Show`;

    return (
      <div className="DrawerParamToggler">
        <div className="flex gaps align-center params">
          <div className="param-label">{label}</div>
          <div className="param-link" onClick={this.toggle} data-testid="drawer-param-toggler">
            <span className="param-link-text">{link}</span>
            <Icon material={icon} />
          </div>
        </div>
        <div className={cssNames("param-content", { open })}>{open && children}</div>
      </div>
    );
  }
}
