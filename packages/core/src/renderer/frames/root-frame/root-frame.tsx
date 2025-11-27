import { rootFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { withInjectables } from "@ogre-tools/injectable-react";
import { Observer } from "mobx-react";
import React from "react";
import broadcastThatRootFrameIsRenderedInjectable from "./broadcast-that-root-frame-is-rendered.injectable";

import type { RootFrameChildComponent } from "@kubesightapp/react-application";

interface Dependencies {
  broadcastThatRootFrameIsRendered: () => void;
  childComponents: RootFrameChildComponent[];
}

class NonInjectedRootFrame extends React.Component<Dependencies> {
  static displayName = "RootFrame";

  componentDidMount() {
    this.props.broadcastThatRootFrameIsRendered();
  }

  render() {
    return (
      <>
        {this.props.childComponents.map((child) => (
          <Observer key={child.id}>{() => (child.shouldRender.get() ? <child.Component /> : null)}</Observer>
        ))}
      </>
    );
  }
}

export const RootFrame = withInjectables<Dependencies>(
  NonInjectedRootFrame,

  {
    getProps: (di, props) => ({
      broadcastThatRootFrameIsRendered: di.inject(broadcastThatRootFrameIsRenderedInjectable),
      childComponents: di.injectMany(rootFrameChildComponentInjectionToken),
      ...props,
    }),
  },
);
