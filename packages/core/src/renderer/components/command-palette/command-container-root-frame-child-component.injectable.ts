import { rootFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { CommandContainer } from "./command-container";

const commandContainerRootFrameChildComponentInjectable = getInjectable({
  id: "command-container-root-frame-child-component",
  instantiate: () => ({
    id: "command-container",
    shouldRender: computed(() => true),
    Component: CommandContainer,
  }),
  injectionToken: rootFrameChildComponentInjectionToken,
});

export default commandContainerRootFrameChildComponentInjectable;
