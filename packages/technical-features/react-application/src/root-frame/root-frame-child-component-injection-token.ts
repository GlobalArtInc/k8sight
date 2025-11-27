import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";

export interface RootFrameChildComponent {
  id: string;
  Component: React.ElementType;
  shouldRender: IComputedValue<boolean>;
}

export const rootFrameChildComponentInjectionToken = getInjectionToken<RootFrameChildComponent>({
  id: "root-frame-child-component",
});
